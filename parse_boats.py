import requests
from lxml import etree
import json
import re
from requests.auth import HTTPBasicAuth
import hashlib
import os
from datetime import datetime
import sys
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def clean_boat_name(name: str) -> str:
    """Очищает название лодки, оставляя только код до первого дефиса"""
    if not name:
        return ""
    
    # Берем только часть ДО первого дефиса
    cleaned_name = name.split(' - ')[0].strip()
    
    return cleaned_name

def validate_boat_names(boats: list) -> list:
    """Валидирует и корректирует названия лодок"""
    valid_boats = []
    
    for boat in boats:
        boat_name = boat.get("Boat Name", "")
        original_name = boat_name
        
        # Очищаем название
        boat["Boat Name"] = clean_boat_name(boat_name)
        
        if original_name != boat["Boat Name"]:
            logger.info(f"Исправлено название: '{original_name}' -> '{boat['Boat Name']}'")
        
        valid_boats.append(boat)
    
    return valid_boats

def safe_int_conversion(value) -> int:
    """Безопасное преобразование в integer"""
    if value is None:
        return None
    
    try:
        if isinstance(value, (int, float)):
            return int(value)
        
        str_value = str(value).strip()
        # Ищем первое число в строке
        match = re.search(r'\d+', str_value)
        return int(match.group()) if match else None
    except (ValueError, TypeError):
        return None

def safe_float_conversion(value) -> float:
    """Безопасное преобразование в float"""
    if value is None:
        return None
    
    try:
        if isinstance(value, (int, float)):
            return float(value)
        
        str_value = str(value).strip()
        # Убираем пробелы и преобразуем
        str_value = re.sub(r'[^\d.]', '', str_value)
        return float(str_value) if str_value else None
    except (ValueError, TypeError):
        return None

def extract_included_items(description: str) -> str:
    """Извлекает информацию о включенных услугах из описания"""
    if not description:
        return ""
    
    # Очищаем описание
    cleaned_description = description.replace('&nbsp;', ' ').replace('\r', ' ')
    
    # Ищем блок "Включено"
    included_match = re.search(r'Включено:\s*(.*?)(?:\n\n|\n\*|\n\s*Pier|\n\s*Пирс|\n\s*$|$)', 
                             cleaned_description, re.IGNORECASE | re.DOTALL)
    
    if included_match:
        included_text = included_match.group(1).strip()
    else:
        # Если блока "Включено" нет, используем все описание
        included_text = cleaned_description
    
    # Очищаем текст
    included_text = re.sub(r'\s*\n\s*', '; ', included_text)  # Заменяем переносы строк
    included_text = re.sub(r'\s*;\s*', '; ', included_text)  # Нормализуем разделители
    included_text = re.sub(r'[✓✔]', '', included_text)  # Удаляем символы галочек
    included_text = re.sub(r'\s+', ' ', included_text)  # Убираем лишние пробелы
    
    return included_text.strip('; ').strip()

def parse_offer_element(offer_element):
    """Парсит элемент offer и возвращает данные лодки"""
    try:
        # Базовые поля
        offer_name = offer_element.find("name")
        offer_name = offer_name.text if offer_name is not None else ""
        
        # Параметры
        params = {}
        for param_element in offer_element.xpath("param"):
            param_name = param_element.get("name")
            param_value = param_element.text
            if param_name and param_value is not None:
                params[param_name] = param_value.strip()

        # Фотографии
        pictures = []
        for pic_element in offer_element.xpath("picture"):
            if pic_element.text and pic_element.text.strip():
                pictures.append(pic_element.text.strip())
        
        main_photo = pictures[0] if pictures else None

        # Описание
        description_element = offer_element.find("description")
        description_text = description_element.text if description_element is not None else ""
        
        # URL
        url_element = offer_element.find("url")
        url = url_element.text if url_element is not None else None

        # Цена
        price_element = offer_element.find("price")
        price = safe_float_conversion(price_element.text) if price_element is not None else None

        # Формируем данные лодки
        boat_data = {
            "Boat Name": clean_boat_name(offer_name),
            "Pier": params.get("Пирс") or params.get("Pier"),
            "Тип": params.get("Тип судна") or params.get("Тип"),
            "Ссылка на сайт": url,
            "Длина": safe_int_conversion(params.get("Длина") or params.get("Длина, м") or "0"),
            "Год": params.get("Год яхты") or params.get("Год"),
            "Макс. чел": safe_int_conversion(params.get("Макс.гостей") or params.get("Макс. чел")),
            "Кают": safe_int_conversion(params.get("Кол-во кают") or params.get("Кают")),
            "Даты сезона": params.get("Выберите даты сезона:") or params.get("Даты сезона"),
            "Длительность": params.get("Выберите длительность") or params.get("Длительность"),
            "Цена": price,
            "Маршрут": params.get("Выберите маршрут:") or params.get("Маршрут"),
            "Главное фото": main_photo,
            "Все фото": pictures,
            "Включено": extract_included_items(description_text)
        }
        
        # Проверяем обязательные поля
        if not boat_data["Boat Name"] or boat_data["Цена"] is None:
            logger.warning(f"Пропущена лодка с недостающими данными: {offer_name}")
            return None
            
        return boat_data
        
    except Exception as e:
        logger.error(f"Ошибка при парсинге элемента offer: {e}")
        return None

def get_file_hash(filename):
    """Вычисляет хеш файла для проверки изменений"""
    try:
        with open(filename, 'rb') as f:
            return hashlib.md5(f.read()).hexdigest()
    except FileNotFoundError:
        return None

def parse_yml_to_json(yml_url, username, password):
    """Парсит YML и возвращает JSON данные"""
    try:
        auth = HTTPBasicAuth(username, password)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/xml,text/xml,application/xhtml+xml,text/html;q=0.9,application/json;q=0.8',
            'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
        }
        
        logger.info(f"Загружаем данные из: {yml_url}")
        response = requests.get(yml_url, auth=auth, headers=headers, timeout=60)
        response.raise_for_status()
        
        # Проверяем content-type
        content_type = response.headers.get('content-type', '').lower()
        if 'xml' not in content_type and 'text' not in content_type:
            return {"error": f"Сервер вернул не XML данные. Content-Type: {content_type}"}
            
        xml_content = response.content
        logger.info(f"Файл успешно загружен, размер: {len(xml_content)} байт")
        
        # Парсим XML
        parser = etree.XMLParser(recover=True, encoding='utf-8')
        root = etree.fromstring(xml_content, parser=parser)
        
        # Ищем все offer элементы
        offer_elements = root.xpath("//offer")
        logger.info(f"Найдено элементов offer: {len(offer_elements)}")
        
        if not offer_elements:
            return {"error": "Не найдено элементов offer в XML"}
        
        boats = []
        successful_parses = 0
        
        for i, offer_element in enumerate(offer_elements):
            boat_data = parse_offer_element(offer_element)
            if boat_data:
                boats.append(boat_data)
                successful_parses += 1
            
            # Логируем прогресс каждые 10 элементов
            if (i + 1) % 10 == 0:
                logger.info(f"Обработано {i + 1}/{len(offer_elements)} элементов")
        
        # ВАЖНО: Добавляем валидацию названий
        boats = validate_boat_names(boats)
        
        logger.info(f"Успешно спарсено лодок: {successful_parses}/{len(offer_elements)}")
        
        if not boats:
            return {"error": "Не удалось спарсить ни одной лодки"}
            
        return json.dumps(boats, indent=2, ensure_ascii=False, default=str)
        
    except Exception as e:
        logger.error(f"Ошибка при парсинге YML: {e}")
        return None

def main():
    # Получаем credentials из переменных окружения
    yml_url = os.getenv('YML_URL', 'https://onlysea.travel/tstore/yml/efae0823983b9f9e2c18a3ac98faca65.yml')
    username = os.getenv('YML_USERNAME')
    password = os.getenv('YML_PASSWORD')
    
    if not username or not password:
        logger.error("Ошибка: YML_USERNAME или YML_PASSWORD не установлены")
        sys.exit(1)
    
    output_file = "boats_data.json"
    
    logger.info(f"🚢 Запуск обновления данных: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Получаем текущий хеш файла
    old_hash = get_file_hash(output_file)
    logger.info(f"📊 Текущий хеш файла: {old_hash}")
    
    # Парсим новые данные
    new_data = parse_yml_to_json(yml_url, username, password)
    
    if new_data is None:
        logger.error("❌ Не удалось получить данные")
        return False
        
    # Сохраняем временно новые данные
    temp_file = "boats_data_temp.json"
    with open(temp_file, "w", encoding="utf-8") as f:
        f.write(new_data)
    
    # Проверяем хеш новых данных
    new_hash = get_file_hash(temp_file)
    logger.info(f"🆕 Хеш новых данных: {new_hash}")
    
    # Сравниваем хеши
    if old_hash == new_hash:
        logger.info("✅ Изменений нет")
        os.remove(temp_file)
        return False
    else:
        logger.info("🔄 Обнаружены изменения! Обновляем файл...")
        os.replace(temp_file, output_file)
        
        # Показываем примеры очищенных названий
        try:
            boats_data = json.loads(new_data)
            logger.info("\nПримеры очищенных названий лодок:")
            for i, boat in enumerate(boats_data[:10]):
                logger.info(f"  {i+1}. {boat['Boat Name']}")
            if len(boats_data) > 10:
                logger.info(f"  ... и еще {len(boats_data) - 10} лодок")
        except:
            pass
            
        return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
