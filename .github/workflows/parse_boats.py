import requests
from lxml import etree
import json
import re
from requests.auth import HTTPBasicAuth
import hashlib
import os
from datetime import datetime
import sys

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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        print(f"Загружаем данные из: {yml_url}")
        response = requests.get(yml_url, auth=auth, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Парсим XML
        root = etree.fromstring(response.content)
        boats = []
        
        for offer_element in root.xpath("//offer"):
            try:
                # Базовые поля
                name_element = offer_element.find("name")
                name = name_element.text if name_element is not None else ""
                
                # Параметры
                params = {}
                for param_element in offer_element.xpath("param"):
                    param_name = param_element.get("name")
                    param_value = param_element.text
                    if param_name and param_value:
                        params[param_name] = param_value

                # Фотографии
                pictures = [pic.text for pic in offer_element.xpath("picture") if pic.text]
                
                # Цена
                price_element = offer_element.find("price")
                price = float(price_element.text) if price_element is not None else 0.0

                boat_data = {
                    "Boat Name": name,
                    "Pier": params.get("Пирс"),
                    "Тип": params.get("Тип судна"),
                    "Длина": params.get("Длина"),
                    "Год": params.get("Год яхты"),
                    "Макс. чел": params.get("Макс.гостей"),
                    "Кают": params.get("Кол-во кают"),
                    "Цена": price,
                    "Маршрут": params.get("Выберите маршрут:"),
                    "Главное фото": pictures[0] if pictures else None,
                    "Все фото": pictures
                }
                
                boats.append(boat_data)
                
            except Exception as e:
                print(f"Ошибка при парсинге offer: {e}")
                continue
        
        print(f"Успешно спарсено лодок: {len(boats)}")
        return json.dumps(boats, indent=2, ensure_ascii=False)
        
    except Exception as e:
        print(f"Ошибка при парсинге YML: {e}")
        return None

def main():
    # Получаем credentials из переменных окружения
    yml_url = os.getenv('YML_URL', 'https://onlysea.travel/tstore/yml/efae0823983b9f9e2c18a3ac98faca65.yml')
    username = os.getenv('YML_USERNAME')
    password = os.getenv('YML_PASSWORD')
    
    if not username or not password:
        print("Ошибка: YML_USERNAME или YML_PASSWORD не установлены")
        sys.exit(1)
    
    output_file = "boats_data.json"
    
    print(f"🚢 Запуск обновления данных: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Получаем текущий хеш файла
    old_hash = get_file_hash(output_file)
    print(f"📊 Текущий хеш файла: {old_hash}")
    
    # Парсим новые данные
    new_data = parse_yml_to_json(yml_url, username, password)
    
    if new_data is None:
        print("❌ Не удалось получить данные")
        return False
        
    # Сохраняем временно новые данные
    temp_file = "boats_data_temp.json"
    with open(temp_file, "w", encoding="utf-8") as f:
        f.write(new_data)
    
    # Проверяем хеш новых данных
    new_hash = get_file_hash(temp_file)
    print(f"🆕 Хеш новых данных: {new_hash}")
    
    # Сравниваем хеши
    if old_hash == new_hash:
        print("✅ Изменений нет")
        os.remove(temp_file)
        return False
    else:
        print("🔄 Обнаружены изменения! Обновляем файл...")
        os.replace(temp_file, output_file)
        return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
