<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OnlySea VIP | Система продажи лодок</title>
    <!-- Добавьте эти строки в секцию head после существующих стилей -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
        }

        /* Светлая тема по умолчанию */
        :root {
            --bg-primary: #f8f9fa;
            --bg-secondary: #ffffff;
            --bg-tertiary: #e9ecef;
            --text-primary: #212529;
            --text-secondary: #6c757d;
            --accent-primary: #056676;
            --accent-secondary: #5eaaa8;
            --accent-tertiary: #a3d2ca;
            --border-color: #dee2e6;
            --shadow-color: rgba(0, 0, 0, 0.1);
        }

        /* Темная тема */
        .dark-theme {
            --bg-primary: #0a1923;
            --bg-secondary: rgba(15, 30, 45, 0.9);
            --bg-tertiary: rgba(27, 51, 55, 0.7);
            --text-primary: #e9ecef;
            --text-secondary: rgba(255, 255, 255, 0.85);
            --accent-primary: #e6be8a;
            --accent-secondary: #d4af37;
            --accent-tertiary: #b8860b;
            --border-color: rgba(255, 255, 255, 0.08);
            --shadow-color: rgba(0, 0, 0, 0.3);
        }

        body, html {
            width: 100%;
            height: 100%;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            scroll-behavior: smooth;
            transition: all 0.3s ease;
        }

        .background {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image: url("https://static.tildacdn.com/stor3736-3733-4831-b333-646237613661/46601227.jpg");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 0.03;
            z-index: -2;
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(10, 25, 35, 0.85);
            z-index: -1;
        }

        .dark-theme .overlay {
            display: block;
        }

        .light-theme .overlay {
            display: none;
        }

        #onlysea-app {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
            position: relative;
            z-index: 1;
        }

        /* Стили для стеклянного эффекта */
        .glass {
            background: var(--bg-secondary);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border-color);
            box-shadow: 0 8px 32px var(--shadow-color);
            border-radius: 16px;
            color: var(--text-primary);
        }

        /* Стили для карточек лодок */
        .boat-card {
            transition: all 0.4s ease;
            border: 1px solid var(--border-color);
            background: var(--bg-secondary);
            border-radius: 16px;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }

        .boat-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 40px rgba(230, 190, 138, 0.2);
            border-color: rgba(230, 190, 138, 0.4);
        }

        .boat-photo {
            width: 100%;
            height: 200px;
            object-fit: cover !important;
            background: var(--bg-tertiary);
            border-radius: 12px;
            margin-bottom: 16px;
        }

        .presentation-boat-photo {
            width: 100%;
            height: 250px;
            object-fit: cover !important;
            background: var(--bg-tertiary);
            border-radius: 12px;
            margin-bottom: 16px;
        }

        /* Кнопки в стиле приложения */
        .btn-primary {
            background: linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(230, 190, 138, 0.4);
            border: none;
            color: #ffffff !important;
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(230, 190, 138, 0.5);
            background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
        }

        .btn-secondary {
            background: var(--bg-tertiary);
            color: var(--accent-primary) !important;
            border: 1px solid rgba(230, 190, 138, 0.5);
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s;
            text-decoration: none;
        }

        .btn-secondary:hover {
            background: rgba(37, 61, 65, 0.9);
            border-color: var(--accent-primary);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(230, 190, 138, 0.2);
        }

        .btn-danger {
            background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
        }

        .btn-danger:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(200, 35, 51, 0.4);
            background: linear-gradient(135deg, #c82333 0%, #dc3545 100%);
        }

        .btn-success {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        }

        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(32, 201, 151, 0.4);
        }

        /* Заголовки и текст */
        h1, h2, h3 {
            color: var(--accent-primary);
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        h1 {
            font-size: 32px;
            text-transform: uppercase;
        }

        h2 {
            font-size: 24px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        h3 {
            font-size: 20px;
        }

        p, span, label {
            color: var(--text-secondary);
        }

        /* Стили для карты */
        #map-container {
            position: relative;
            width: 100%;
            height: 450px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 20px var(--shadow-color);
        }

        #map {
            width: 100%;
            height: 100%;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
        }

        /* Стили для информации о маршруте */
        .route-info-compact {
            background: var(--bg-secondary);
            border: 1px solid rgba(230, 190, 138, 0.2);
            border-radius: 16px;
            padding: 20px;
            margin-top: 16px;
        }

        .route-stats-compact {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 20px;
        }

        .route-stat-compact {
            background: var(--bg-tertiary);
            padding: 12px;
            border-radius: 10px;
            border-left: 3px solid var(--accent-primary);
            box-shadow: 0 1px 3px var(--shadow-color);
            text-align: center;
        }

        .route-stat-value {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 4px;
            color: var(--accent-primary);
        }

        .route-stat-label {
            font-size: 12px;
            color: var(--text-secondary);
            font-weight: 500;
        }

        /* Бейджи сезонов */
        .season-badge {
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }

        .season-high { background: rgba(220, 53, 69, 0.15); color: #dc3545; border: 1px solid rgba(220, 53, 69, 0.4); }
        .season-low { background: rgba(40, 167, 69, 0.15); color: #28a745; border: 1px solid rgba(40, 167, 69, 0.4); }
        .season-peak { background: rgba(255, 193, 7, 0.15); color: #b8860b; border: 1px solid rgba(255, 193, 7, 0.4); }

        /* Модальные окна */
        .photo-modal {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.9);
            z-index: 99999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .photo-modal.active {
            display: flex;
        }

        .pdf-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            z-index: 99998;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow-y: auto;
        }

        .pdf-modal-content {
            background: var(--bg-secondary);
            border-radius: 16px;
            max-width: 1200px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
        }

        .pdf-modal-header {
            padding: 24px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .pdf-modal-body {
            padding: 24px;
        }

        .pdf-modal-footer {
            padding: 24px;
            margin-top: 24px;
            display: flex;
            gap: 16px;
        }

        /* Информация о лодке */
        .boat-card-info {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 8px;
            align-items: center;
            margin-bottom: 16px;
        }

        .boat-card-info > span:nth-child(odd) {
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 14px;
        }

        .boat-card-info > span:nth-child(even) {
            color: var(--accent-primary);
            font-weight: 600;
            text-align: right;
            font-size: 14px;
        }

        /* Списки */
        #boatsList {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 20px;
        }

        /* Элементы управления */
        .control-buttons {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .control-btn {
            padding: 12px 16px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
        }

        .control-btn:hover {
            transform: translateY(-2px);
        }

        /* Формы и селекты */
        .filter-input {
            transition: all 0.2s;
            width: 100%;
            padding: 12px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 14px;
            color: var(--text-primary);
            font-weight: 500;
        }

        .filter-input:focus {
            border-color: var(--accent-primary);
            box-shadow: 0 0 0 2px rgba(230, 190, 138, 0.3);
            outline: none;
        }

        /* Маршруты */
        .route-card {
            background: var(--bg-tertiary);
            border-left: 4px solid var(--accent-primary);
            transition: all 0.3s ease;
            cursor: pointer;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 12px;
        }

        .route-card:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 15px rgba(230, 190, 138, 0.3);
            background: rgba(37, 61, 65, 0.9);
        }

        .route-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
        }

        /* Утилитарные классы */
        .hidden { display: none !important; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .mb-4 { margin-bottom: 16px; }
        .mt-4 { margin-top: 16px; }
        .p-4 { padding: 16px; }

        /* Презентация */
        .presentation-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .presentation-boat {
            background: var(--bg-secondary);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 12px var(--shadow-color);
            border: 1px solid var(--border-color);
            page-break-inside: avoid;
        }

        .presentation-route {
            background: var(--bg-secondary);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 12px var(--shadow-color);
            border: 1px solid var(--border-color);
            page-break-inside: avoid;
        }

        /* Адаптивность */
        @media (max-width: 1024px) {
            .route-stats-compact {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            #onlysea-app {
                padding: 10px;
            }
            
            #onlysea-app > div {
                grid-template-columns: 1fr;
            }
            
            .boat-card-info {
                font-size: 12px;
            }
            
            .route-stats-compact {
                grid-template-columns: 1fr;
            }
            
            #boatsList {
                grid-template-columns: 1fr;
            }
        }

        /* Индикатор загрузки */
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.1);
            border-radius: 50%;
            border-top-color: var(--accent-primary);
            animation: spin 1s ease-in-out infinite;
            margin-left: 8px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Фотогалерея */
        .photo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
            max-height: 70vh;
            overflow-y: auto;
            padding: 16px;
        }

        .photo-item {
            position: relative;
            aspect-ratio: 1;
            overflow: hidden;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.3s;
        }

        .photo-item:hover {
            transform: scale(1.05);
        }

        .photo-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Спецификации для карты */
        .route-line {
            stroke: var(--accent-primary);
            stroke-opacity: 0.8;
            stroke-weight: 4;
        }

        .route-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--accent-primary);
            border: 2px solid white;
            box-shadow: 0 0 0 2px rgba(230, 190, 138, 0.3);
        }

        /* Счетчики */
        #favoriteCount, #boatsCount {
            color: var(--accent-primary);
            font-weight: 700;
        }

        /* Заголовок приложения */
        .app-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 24px;
        }

        .app-title {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .app-logo {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px var(--shadow-color);
            background: linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 50%, var(--accent-tertiary) 100%);
        }

        .favorite-counter {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(230, 190, 138, 0.15);
            padding: 8px 16px;
            border-radius: 8px;
            border: 1px solid rgba(230, 190, 138, 0.3);
        }

        /* Поиск лодок */
        .search-container {
            margin-bottom: 20px;
        }

        .search-input {
            width: 100%;
            padding: 12px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 14px;
            color: var(--text-primary);
            transition: all 0.2s;
            font-weight: 500;
        }

        .search-input:focus {
            border-color: var(--accent-primary);
            box-shadow: 0 0 0 2px rgba(230, 190, 138, 0.3);
            outline: none;
        }

        /* Нумерация маршрута */
        .route-number {
            position: absolute;
            top: -8px;
            left: -8px;
            width: 24px;
            height: 24px;
            background: var(--accent-primary);
            color: #0a1923;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
            z-index: 100;
            box-shadow: 0 2px 4px var(--shadow-color);
        }

        .route-number-pier {
            background: var(--accent-secondary);
        }

        /* Стили для презентации с одной лодкой */
        .single-boat-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 600px;
            margin: 0 auto;
        }

        .single-boat-layout .presentation-boat {
            width: 100%;
        }

        .single-boat-layout .presentation-boat-photo {
            height: 300px;
            object-fit: cover;
        }
        
        /* Стили для раскрывающегося блока "Включено" */
        .included-content {
            margin-top: 12px;
            padding: 16px;
            background: var(--bg-tertiary);
            border-radius: 8px;
            border: 1px solid var(--border-color);
            display: none;
        }

        .included-content.active {
            display: block;
        }

        .included-toggle {
            background: rgba(230, 190, 138, 0.15);
            color: var(--accent-primary);
            border: 1px solid rgba(230, 190, 138, 0.4);
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            justify-content: center;
        }

        .included-toggle:hover {
            background: rgba(230, 190, 138, 0.25);
            transform: translateY(-1px);
        }

        .included-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .included-item {
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color);
            color: var(--text-secondary);
            font-size: 14px;
            line-height: 1.4;
            display: flex;
            align-items: flex-start;
            gap: 8px;
        }

        .included-item:last-child {
            border-bottom: none;
        }

        .included-item::before {
            content: "✓";
            color: #28a745;
            font-weight: bold;
            flex-shrink: 0;
            margin-top: 2px;
        }

        /* Стили для фильтра сезонов */
        .season-filter {
            margin-bottom: 16px;
        }

        .season-filter-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }

        .season-filter-btn {
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid transparent;
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            text-align: center;
        }

        .season-filter-btn.active {
            color: white;
        }

        .season-filter-btn.high.active {
            background: #dc3545;
            border-color: #dc3545;
        }

        .season-filter-btn.low.active {
            background: #28a745;
            border-color: #28a745;
        }

        .season-filter-btn.peak.active {
            background: #ffc107;
            border-color: #ffc107;
            color: #212529;
        }

        .season-filter-btn.all.active {
            background: linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%);
            border-color: var(--accent-primary);
            color: #ffffff;
        }

        .season-filter-btn:hover:not(.active) {
            background: rgba(230, 190, 138, 0.15);
            border-color: var(--accent-primary);
        }

        /* Тема переключатель */
        .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }

        .theme-toggle-btn {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px var(--shadow-color);
            transition: all 0.3s;
        }

        .theme-toggle-btn:hover {
            transform: rotate(30deg);
            border-color: var(--accent-primary);
        }

        /* Стили для компактной плашки погоды в презентации */
        .weather-compact {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, rgba(230, 190, 138, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%);
            border: 1px solid rgba(230, 190, 138, 0.3);
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 16px;
        }

        .weather-compact-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            flex: 1;
        }

        .weather-compact-icon {
            font-size: 24px;
            margin-bottom: 4px;
        }

        .weather-compact-label {
            font-size: 12px;
            color: var(--text-secondary);
            font-weight: 500;
            margin-bottom: 2px;
        }

        .weather-compact-value {
            font-size: 14px;
            font-weight: 700;
            color: var(--accent-primary);
        }

        /* Золотой цвет для жирного шрифта в темной теме */
        .dark-theme .glass h1,
        .dark-theme .glass h2,
        .dark-theme .glass h3,
        .dark-theme .glass h4,
        .dark-theme .glass h5,
        .dark-theme .glass h6,
        .dark-theme .glass [style*="font-weight: 700"],
        .dark-theme .glass [style*="font-weight: 600"],
        .dark-theme .glass [style*="font-weight: bold"],
        .dark-theme .glass strong,
        .dark-theme .glass b,
        .dark-theme .glass .route-stat-value,
        .dark-theme .glass .favorite-counter span,
        .dark-theme .glass .weather-compact-value,
        .dark-theme .glass .btn-primary,
        .dark-theme .glass .btn-secondary,
        .dark-theme .glass .btn-success,
        .dark-theme .glass .btn-danger {
            color: var(--accent-primary) !important;
            text-shadow: 0 0 1px rgba(230, 190, 138, 0.3);
        }

        /* Особые стили для заголовков в презентации в темной теме */
        .dark-theme .presentation-container h1,
        .dark-theme .presentation-container h2,
        .dark-theme .presentation-container h3,
        .dark-theme .presentation-container h4,
        .dark-theme .presentation-boat h3,
        .dark-theme .presentation-route h3 {
            color: var(--accent-primary) !important;
            font-weight: 700 !important;
        }

        /* Золотой цвет для жирного текста в карточках лодок */
        .dark-theme .boat-card h3,
        .dark-theme .boat-card [style*="font-weight: 700"],
        .dark-theme .boat-card [style*="font-weight: 600"] {
            color: var(--accent-primary) !important;
        }

        /* Золотой цвет для цен и важной информации */
        .dark-theme .boat-card-info > span:nth-child(even),
        .dark-theme #favoriteCount,
        .dark-theme #boatsCount,
        .dark-theme .route-stat-value {
            color: var(--accent-primary) !important;
        }

        /* Золотой цвет для кнопок текста */
        .dark-theme .btn-primary,
        .dark-theme .btn-secondary,
        .dark-theme .btn-success,
        .dark-theme .btn-danger {
            color: var(--accent-primary) !important;
        }

        /* Золотой градиент для некоторых элементов */
        .app-logo {
            background: linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 50%, var(--accent-tertiary) 100%) !important;
        }

        /* Золотой цвет для иконок в темной теме */
        .dark-theme .favorite-counter svg,
        .dark-theme .app-title svg {
            stroke: var(--accent-primary) !important;
        }

        .dark-theme .favorite-counter svg path {
            fill: var(--accent-primary) !important;
        }

        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.1);
            border-radius: 50%;
            border-top-color: var(--accent-primary);
            animation: spin 1s ease-in-out infinite;
            margin-left: 8px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            #onlysea-app {
                padding: 10px;
            }
            
            #boatsList {
                grid-template-columns: 1fr;
            }
        }
        
        
        
        /* Адаптив для планшетов и небольших экранов (768px и ниже) */
@media (max-width: 1024px) {
    #onlysea-app {
        max-width: 100%;
        padding: 12px;
    }

    #onlysea-app > div {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .route-stats-compact {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Адаптив для мобильных телефонов (до 768px) */
@media (max-width: 768px) {
    /* Основной контейнер */
    #onlysea-app {
        padding: 8px;
    }

    /* Шапка приложения */
    .app-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .app-title {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    h1 {
        font-size: 24px;
    }

    /* Левая и правая панели */
    #onlysea-app > div {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    /* Карточки лодок */
    #boatsList {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .boat-card {
        padding: 12px;
    }

    .boat-card-info {
        font-size: 12px;
        grid-template-columns: 1fr;
        gap: 4px;
    }

    .boat-card-info > span {
        display: block;
        text-align: left;
    }

    /* Карта */
    #map-container {
        height: 300px;
    }

    /* Компактная информация о маршруте */
    .route-stats-compact {
        grid-template-columns: 1fr;
    }

    /* Фильтры и селекторы */
    .filter-input,
    .search-input {
        padding: 10px 12px;
        font-size: 13px;
    }

    /* Кнопки */
    .btn-primary,
    .btn-secondary,
    .control-btn {
        padding: 10px 16px;
        font-size: 14px;
    }

    /* Модальные окна */
    .photo-modal,
    .pdf-modal-overlay {
        padding: 0;
    }

    .photo-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    /* Презентация */
    .presentation-container {
        padding: 12px;
    }

    .presentation-boat {
        padding: 12px;
    }

    .presentation-boat-photo {
        height: 200px;
    }
}

/* Адаптив для очень маленьких экранов (до 480px) */
@media (max-width: 480px) {
    /* Уменьшаем отступы и размеры шрифтов */
    h1 {
        font-size: 20px;
    }

    h2 {
        font-size: 18px;
    }

    .boat-card-info > span {
        font-size: 11px;
    }

    /* Кнопки в одну колонку */
    .control-buttons {
        flex-direction: column;
    }

    .control-btn {
        width: 100%;
        margin-bottom: 8px;
    }

    /* Карта */
    #map-container {
        height: 250px;
    }

    /* Презентация */
    .presentation-boat-photo {
        height: 180px;
    }

    .presentation-boat {
        padding: 8px;
    }
}

    </style>
</head>
<body class="light-theme">
    <div class="background"></div>
    <div class="overlay"></div>
    
    <!-- Переключатель темы -->
    <div class="theme-toggle">
        <button class="theme-toggle-btn" id="themeToggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
        </button>
    </div>
    
    <div id="onlysea-app">
        <!-- Шапка -->
        <header class="glass app-header">
            <div class="app-title">
                <div class="app-logo">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14l-1.1 5.5a2 2 0 01-2 1.5H7.1a2 2 0 01-2-1.5L4 12zm7-6.5V2" />
                    </svg>
                </div>
                <div>
                    <h1>OnlySea VIP</h1>
                    <p style="font-size: 14px; color: var(--text-secondary); margin: 0;">Система подбора лодок</p>
                </div>
            </div>
            <div class="favorite-counter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="currentColor" />
                </svg>
                <span style="font-size: 14px; font-weight: 600;">Избранное: <span id="favoriteCount" style="color: var(--accent-primary);">0</span></span>
            </div>
        </header>

        <!-- Основной контент -->
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
            <!-- Левая панель -->
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Готовые маршруты -->
                <div class="glass" style="padding: 24px;">
                    <h2>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
                        </svg>
                        Готовые маршруты
                    </h2>
                    <div id="presetRoutesContainer" style="display: flex; flex-direction: column; gap: 12px;"></div>
                </div>

                <!-- Построение маршрута -->
                <div class="glass" style="padding: 24px;">
                    <h2>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        Построить маршрут
                    </h2>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div>
                            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-secondary);">Пирс отправления</label>
                            <select id="pierSelect" class="filter-input">
                                <option value="">Выберите пирс</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-secondary);">Острова назначения</label>
                            <div id="islandList" style="background: var(--bg-tertiary); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); max-height: 256px; overflow-y: auto;">
                                <p style="font-size: 14px; color: var(--text-secondary);">Сначала выберите пирс</p>
                            </div>
                        </div>
                        
                        <!-- Фильтр по сезону -->
                        <div class="season-filter">
                            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-secondary);">Сезон</label>
                            <div class="season-filter-buttons">
                                <button class="season-filter-btn all active" data-season="all">Все сезоны</button>
                                <button class="season-filter-btn high" data-season="high">Высокий</button>
                                <button class="season-filter-btn low" data-season="low">Низкий</button>
                                <button class="season-filter-btn peak" data-season="peak">Пиковый</button>
                            </div>
                        </div>
                        
                        <div>
                            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-secondary);">Тип судна</label>
                            <select id="vesselSelect" class="filter-input">
                                <option value="">Любой тип лодки</option>
                                <option value="motorYacht">Motor Yacht (20 узлов)</option>
                                <option value="motorCatamaran">Motor Catamaran (15 узлов)</option>
                                <option value="sailCatamaran">Sail Catamaran (8 узлов)</option>
                                <option value="speedboat">Speedboat (30 узлов)</option>
                                <option value="fishingBoat">Рыбацкая лодка</option>
                            </select>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <button id="calculateRouteBtn" class="btn-primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                    <path d="M16 3.13a4 4 0 010 7.75" />
                                </svg>
                                Построить маршрут
                            </button>
                            <button id="clearRouteBtn" class="btn-danger">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
                                    <line x1="18" y1="4" x2="12" y2="10" />
                                    <line x1="18" y1="10" x2="12" y2="4" />
                                </svg>
                                Очистить
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Управление избранным -->
                <div class="glass" style="padding: 24px;">
                    <h3 style="display: flex; align-items: center; gap: 8px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                        Управление
                    </h3>
                    <div class="control-buttons">
                        <button id="selectAllBtn" class="control-btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <line x1="20" y1="8" x2="20" y2="14" />
                                <line x1="23" y1="11" x2="17" y2="11" />
                            </svg>
                            Выбрать все
                        </button>
                        <button id="clearAllBtn" class="control-btn btn-danger">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
                                <line x1="18" y1="4" x2="12" y2="10" />
                                <line x1="18" y1="10" x2="12" y2="4" />
                            </svg>
                            Очистить избранное
                        </button>
                        <button id="generatePdfBtn" class="control-btn btn-success">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            Создать презентацию
                        </button>
                    </div>
                </div>
            </div>

            <!-- Правая панель -->
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Карта -->
                <div class="glass" style="padding: 24px;">
                    <h2>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
                            <line x1="8" y1="2" x2="8" y2="18" />
                            <line x1="16" y1="6" x2="16" y2="22" />
                        </svg>
                        Карта маршрутов
                    </h2>
                    <div id="map-container">
                        <div id="map"></div>
                    </div>
                    <!-- Компактная информация о маршруте -->
                    <div id="routeInfoCompact" class="route-info-compact hidden">
                        <h3 style="display: flex; align-items: center; gap: 8px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 11 12 14 22 4" />
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                            </svg>
                            Информация о маршруте
                        </h3>
                        <div class="route-stats-compact">
                            <div class="route-stat-compact">
                                <div class="route-stat-value" id="compactTotalDistance">0 км</div>
                                <div class="route-stat-label">Расстояние</div>
                            </div>
                            <div class="route-stat-compact">
                                <div class="route-stat-value" id="compactTotalTime">0 мин</div>
                                <div class="route-stat-label">Время</div>
                            </div>
                            <div class="route-stat-compact">
                                <div class="route-stat-value" id="compactVesselType">20 уз</div>
                                <div class="route-stat-label">Скорость</div>
                            </div>
                            <div class="route-stat-compact">
                                <div class="route-stat-value" id="compactIslandsCount">0</div>
                                <div class="route-stat-label">Острова</div>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
                            <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 10px; box-shadow: 0 1px 3px var(--shadow-color);">
                                <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-secondary);">Сегменты маршрута</h4>
                                <div id="routeSegmentsCompact"></div>
                            </div>
                            <div style="background: linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%); color: #ffffff; padding: 16px; border-radius: 10px; box-shadow: 0 2px 8px rgba(230, 190, 138, 0.4); text-align: center;">
                                <div style="font-size: 32px; margin-bottom: 8px;" id="compactWeatherIcon">☀️</div>
                                <div style="font-weight: 700; margin-bottom: 8px;" id="compactWeatherCondition">Ясно</div>
                                <div style="font-size: 13px; opacity: 0.9;">
                                    <div id="compactWeatherTemp">31°C</div>
                                    <div id="compactWeatherWind">0.6 м/с</div>
                                    <div id="compactWeatherWaves">0.2 м</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Поиск лодок -->
                <div class="glass" style="padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h2 style="margin-bottom: 0;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14l-1.1 5.5a2 2 0 01-2 1.5H7.1a2 2 0 01-2-1.5L4 12zm7-6.5V2" />
                            </svg>
                            Доступные лодки
                            <span id="boatsCount" style="font-size: 14px; font-weight: 400;">(0)</span>
                        </h2>
                        <div class="search-container" style="width: 300px;">
                            <input type="text" id="boatSearch" class="search-input" placeholder="Поиск лодок...">
                        </div>
                    </div>
                    <div id="boatsList">
                        <div style="text-align: center; color: var(--text-secondary); padding: 32px;">
                            Загрузка лодок...
                            <div class="loading-spinner"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Модальное окно фотогалереи -->
    <div id="photoModal" class="photo-modal">
        <div style="position: absolute; top: 16px; right: 16px; z-index: 10;">
            <button id="closePhotoModal" style="background: var(--bg-secondary); color: var(--text-secondary); border-radius: 50%; padding: 12px; border: 1px solid var(--border-color); cursor: pointer; box-shadow: 0 4px 12px var(--shadow-color); transition: all 0.3s;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
        <div style="background: var(--bg-secondary); border-radius: 16px; max-width: 1200px; width: 100%; max-height: 90vh; overflow: hidden; border: 1px solid var(--border-color);">
            <div style="padding: 24px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; color: var(--accent-primary);" id="photoModalTitle">Фотографии</h3>
                <div style="display: flex; gap: 12px;">
                    <button id="downloadSelectedPhotos" class="btn-primary" style="padding: 8px 16px; font-size: 14px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Скачать выбранные
                    </button>
                    <button id="downloadAllPhotos" class="btn-primary" style="padding: 8px 16px; font-size: 14px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Скачать все
                    </button>
                </div>
            </div>
            <div class="photo-grid" id="photoGallery"></div>
        </div>
    </div>

    <!-- Модальное окно PDF -->
    <div id="pdfModal" class="pdf-modal-overlay">
        <div class="pdf-modal-content">
            <div class="pdf-modal-header">
                <h3 style="margin: 0; color: var(--accent-primary);">ПРЕЗЕНТАЦИЯ ЯХТ ПХУКЕТА</h3>
                <button id="closePdfModal" style="color: var(--text-secondary); background: none; border: none; cursor: pointer; padding: 8px; transition: color 0.3s;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
            <div class="pdf-modal-body">
                <div id="pdfPreview"></div>
                <div class="pdf-modal-footer">
                    <button id="downloadPngBtn" class="control-btn" style="flex: 1; background: linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%); color: #ffffff;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 15l-6-6-6-6" />
                        </svg>
                        Скачать PNG
                    </button>
                    <button id="downloadTxtBtn" class="control-btn" style="flex: 1; background: #28a745; color: white;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        Скачать TXT
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>

(function() {
    'use strict';
        // Ваш Google Maps API ключ
        const GOOGLE_MAPS_API_KEY = 'AIzaSyA2dvaJ7FB8j_9tWZHNoKDnQ2pAQRd-lV0';
        const BOATS_DATA_URL = 'https://raw.githubusercontent.com/vladislavius/map/refs/heads/main/combined_boat_data_from_yml_and_csv.json';

        // Данные островов
        const ISLAND_INFO = {
            "Phi Phi Islands": { description: "Архипелаг из 6 островов с белоснежными пляжами, изумрудными лагунами и живописными скалами." },
            "Similan Islands": { description: "Национальный парк из 11 островов, известный лучшими местами для дайвинга в Таиланде." },
            "Racha Yai Island": { description: "Остров с великолепными пляжами и идеальными условиями для снорклинга." },
            "Racha Noi Island": { description: "Более дикий и менее посещаемый остров с изумрудными водами." },
            "Khai Islands": { description: "Три небольших острова с белоснежным коралловым песком в 15 минутах от Пхукета." },
            "Khai Nok Island": { description: "Второй по величине остров из группы Кхай." },
            "James Bond Island": { description: "Знаменитый остров-скала Ко Тапу из фильма 'Человек с золотым пистолетом'." },
            "Nakha Noi Island": { description: "Уединенный остров с нетронутой природой и тихими пляжами." },
            "Naka Island": { description: "Остров с роскошными виллами и спокойными пляжами." },
            "Coral Island": { description: "Остров Хе известен коралловыми рифами, идеальными для снорклинга." },
            "Maiton Island": { description: "Частный остров, называемый 'Мальдивы Таиланда'." },
            "Phang Nga Bay": { description: "Живописный залив со множеством известняковых скал, пещер и мангровых лесов." },
            "Ko Kai (Chicken Island)": { description: "Остров, по форме напоминающий голову курицы." },
            "Ko Yao Nai": { description: "Тихий и аутентичный остров с рисовыми полями." },
            "Rang Yai Island": { description: "Известен жемчужной фермой и красивыми пляжами." },
            "Hong Krabi": { description: "Остров с лагуной в центре, доступной через узлый проход в скалах." },
            "Krabi Islands": { description: "Группа островов в провинции Краби, известная карстовыми пейзажами." },
            "Surin Islands": { description: "Национальный морской парк из двух островов, рай для дайверов." },
            "Lipe Island": { description: "Жемчужина Андаманского моря с бирюзовой водой." },
            "Lanta Island": { description: "Спокойный остров с протяженными пляжами." },
            "Poda Island": { description: "Один из самых красивых островов у побережья Краби." },
            "Railay Beach": { description: "Живописный полуостров, доступный только по морю." },
            "Bamboo Island": { description: "Ко Май Пхай - часть архипелага Пхи-Пхи." },
            "Banana Beach": { description: "Скрытый пляж на Пхукете с чистой водой." },
            "Promthep Cape": { description: "Самая южная точка Пхукета, известная видами на закат." },
            "Phanak Island": { description: "Остров в заливе Пханг Нга, знаменитый лагунами." }
        };

         // Данные маршрутов
        const ROUTES_DATA = [
            {"№":1,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Nakha Noi Island","Координаты острова (широта)":8.030958,"Координаты острова (долгота)":98.460762,"Расстояние (км)":18.52,"Время - Моторная яхта (мин)":30},
            {"№":2,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Khai Nok Island","Координаты острова (широта)":7.89144,"Координаты острова (долгота)":98.515249,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":3,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Phang Nga Bay","Координаты острова (широта)":8.21638,"Координаты острова (долгота)":98.50799,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":4,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Ko Kai (Chicken Island)","Координаты острова (широта)":7.9539974,"Координаты острова (долгота)":98.8019428,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":5,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Ko Yao Nai","Координаты острова (широта)":8.12,"Координаты острова (долгота)":98.62,"Расстояние (км)":22.224,"Время - Моторная яхта (мин)":36},
            {"№":6,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Rang Yai Island","Координаты острова (широта)":7.958508,"Координаты острова (долгота)":98.447673,"Расстояние (км)":14.816,"Время - Моторная яхта (мин)":24},
            {"№":7,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"James Bond Island","Координаты острова (широта)":8.27448,"Координаты острова (долгота)":98.50109,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":8,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Maiton Island","Координаты острова (широта)":7.765062,"Координаты острова (долгота)":98.479373,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":9,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Coral Island","Координаты острова (широта)":7.7407852,"Координаты острова (долгота)":98.3614811,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":10,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Racha Yai Island","Координаты острова (широта)":7.61,"Координаты острова (долгота)":98.37,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":11,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Racha Noi Island","Координаты острова (широта)":7.50561,"Координаты острова (долгота)":98.32615,"Расстояние (км)":74.08,"Время - Моторная яхта (мин)":120},
            {"№":12,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Phi Phi Islands","Координаты острова (широта)":7.74,"Координаты острова (долгота)":98.77,"Расстояние (км)":74.08,"Время - Моторная яхта (мин)":120},
            {"№":13,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Hong Krabi","Координаты острова (широта)":8.0785,"Координаты острова (долгота)":98.67804,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":14,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Ko Roi","Координаты острова (широта)":8.19404,"Координаты острова (долгота)":98.61276,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":15,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Krabi Islands","Координаты острова (широта)":8.01,"Координаты острова (долгота)":98.84,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":16,"Пирс отправления":"Ao Po Grand Marina","Координаты пирса (широта)":8.069079,"Координаты пирса (долгота)":98.443089,"Остров назначения":"Similan Islands","Координаты острова (широта)":8.65251,"Координаты острова (долгота)":97.64503,"Расстояние (км)":111.12,"Время - Моторная яхта (мин)":180},
            {"№":17,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Phang Nga Bay","Координаты острова (широта)":8.21638,"Координаты острова (долгота)":98.50799,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":18,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Krabi Islands","Координаты острова (широта)":8.01,"Координаты острова (долгота)":98.84,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":19,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Maiton Island","Координаты острова (широта)":7.765062,"Координаты острова (долгота)":98.479373,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":20,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Phi Phi Islands","Координаты острова (широта)":7.74,"Координаты острова (долгота)":98.77,"Расстояние (км)":74.08,"Время - Моторная яхта (мин)":120},
            {"№":21,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Banana Beach","Координаты острова (широта)":7.746579,"Координаты острова (долгота)":98.383698,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":22,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Coral Island","Координаты острова (широта)":7.7407852,"Координаты острова (долгота)":98.3614811,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":23,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Racha Yai Island","Координаты острова (широта)":7.61,"Координаты острова (долгота)":98.37,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":24,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Promthep Cape","Координаты острова (широта)":7.76,"Координаты острова (долгота)":98.3,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":25,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Khai Nok Island","Координаты острова (широта)":7.89144,"Координаты острова (долгота)":98.51529,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":26,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Phanak Island","Координаты острова (широта)":8.1742386,"Координаты острова (долгота)":98.491243,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":27,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Naka Island","Координаты острова (широта)":8.053246,"Координаты острова (долгота)":98.474283,"Расстояние (км)":11.112,"Время - Моторная яхта (мин)":18},
            {"№":28,"Пирс отправления":"AoPo, Phuket","Координаты пирса (широта)":8.0611803,"Координаты пирса (долгота)":98.4329087,"Остров назначения":"Hong Krabi","Координаты острова (широта)":8.0785,"Координаты острова (долгота)":98.67804,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":29,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Rang Yai Island","Координаты острова (широта)":7.958508,"Координаты острова (долгота)":98.447673,"Расстояние (км)":7.408,"Время - Моторная яхта (мин)":12},
            {"№":30,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Khai Nok Island","Координаты острова (широта)":7.89144,"Координаты острова (долгота)":98.51529,"Расстояние (км)":11.112,"Время - Моторная яхта (мин)":18},
            {"№":31,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Phang Nga Bay","Координаты острова (широта)":8.21638,"Координаты острова (долгота)":98.50799,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":32,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Naka Island","Координаты острова (широта)":8.05086,"Координаты острова (долгота)":98.46594,"Расстояние (км)":16.668,"Время - Моторная яхта (мин)":27},
            {"№":33,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Maiton Island","Координаты острова (широта)":7.765062,"Координаты острова (долгота)":98.479373,"Расстояние (км)":22.224,"Время - Моторная яхта (мин)":36},
            {"№":34,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Coral Island","Координаты острова (широта)":7.7407852,"Координаты острова (долгота)":98.3614811,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":35,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Phi Phi Islands","Координаты острова (широта)":7.74,"Координаты острова (долгота)":98.77,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":36,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Racha Yai Island","Координаты острова (широта)":7.61,"Координаты острова (долгота)":98.37,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":37,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Similan Islands","Координаты острова (широта)":8.65251,"Координаты острова (долгота)":97.64503,"Расстояние (км)":120.38,"Время - Моторная яхта (мин)":195},
            {"№":38,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Surin Island","Координаты острова (широта)":9.40496,"Координаты острова (долгота)":97.85987,"Расстояние (км)":129.64,"Время - Моторная яхта (мин)":210},
            {"№":39,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Lipe Island","Координаты острова (широта)":6.49,"Координаты острова (долгота)":99.3,"Расстояние (км)":222.24,"Время - Моторная яхта (мин)":360},
            {"№":40,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Lanta Island","Координаты острова (широта)":7.53,"Координаты острова (долгота)":99.09,"Расстояние (км)":101.86,"Время - Моторная яхта (мин)":165},
            {"№":41,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Koh Yao Island","Координаты острова (широта)":8.12,"Координаты острова (долгота)":98.62,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":42,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Hong Krabi","Координаты острова (широта)":8.0785,"Координаты острова (долгота)":98.67804,"Расстояние (км)":31.484,"Время - Моторная яхта (мин)":51},
            {"№":43,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Poda Island","Координаты острова (широта)":7.9708438,"Координаты острова (долгота)":98.8058077,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":44,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Railay Beach","Координаты острова (широта)":8.0119616,"Координаты острова (долгота)":98.8377897,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":45,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"Bamboo Island","Координаты острова (широта)":7.8167,"Координаты острова (долгота)":98.79546,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":46,"Пирс отправления":"Boat Lagoon, Phuket","Координаты пирса (широта)":7.964718,"Координаты пирса (долгота)":98.393512,"Остров назначения":"James Bond Island","Координаты острова (широта)":8.273125,"Координаты острова (долгота)":98.498176,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":47,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Racha Yai Island","Координаты острова (широта)":7.61,"Координаты острова (долгота)":98.37,"Расстояние (км)":22.224,"Время - Моторная яхта (мин)":36},
            {"№":48,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Racha Noi Island","Координаты острова (широта)":7.50561,"Координаты острова (долгота)":98.32615,"Расстояние (км)":31.484,"Время - Моторная яхта (мин)":51},
            {"№":49,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Phi Phi Islands","Координаты острова (широта)":7.74,"Координаты острова (долгота)":98.77,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":50,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Hong Krabi","Координаты острова (широта)":8.0785,"Координаты острова (долгота)":98.67804,"Расстояние (км)":40.744,"Время - Моторная яхта (мин)":66},
            {"№":51,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"James Bond Island","Координаты острова (широта)":8.27448,"Координаты острова (долгота)":98.50109,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":52,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Phang Nga Bay","Координаты острова (широта)":8.27,"Координаты острова (долгота)":98.5,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":53,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Coral Island","Координаты острова (широта)":7.7407852,"Координаты острова (долгота)":98.3614811,"Расстояние (км)":9.26,"Время - Моторная яхта (мин)":15},
            {"№":54,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Maiton Island","Координаты острова (широта)":7.765062,"Координаты острова (долгота)":98.479373,"Расстояние (км)":9.26,"Время - Моторная яхта (мин)":15},
            {"№":55,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Khai Nok Island","Координаты острова (широта)":7.891,"Координаты острова (долгота)":98.5154634,"Расстояние (км)":18.52,"Время - Моторная яхта (мин)":30},
            {"№":56,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Banana Beach","Координаты острова (широта)":7.746579,"Координаты острова (долгота)":98.383698,"Расстояние (км)":9.26,"Время - Моторная яхта (мин)":15},
            {"№":57,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Promthep Cape","Координаты острова (широта)":7.76,"Координаты острова (долгота)":98.3,"Расстояние (км)":9.26,"Время - Моторная яхта (мин)":15},
            {"№":58,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Khai Nai Island","Координаты острова (широта)":7.90803,"Координаты острова (долгота)":98.54939,"Расстояние (км)":18.52,"Время - Моторная яхта (мин)":30},
            {"№":59,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Krabi Islands","Координаты острова (широта)":8.01,"Координаты острова (долгота)":98.84,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":60,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Koh Poda","Координаты острова (широта)":7.9708438,"Координаты острова (долгота)":98.8058077,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":61,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Thale Waek","Координаты острова (широта)":7.96072,"Координаты острова (долгота)":98.81213,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":62,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Bamboo Island","Координаты острова (широта)":7.8167,"Координаты острова (долгота)":98.79546,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":63,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Railay Beach","Координаты острова (широта)":8.0119616,"Координаты острова (долгота)":98.8377897,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":64,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Pakbia Island","Координаты острова (широта)":8.11798,"Координаты острова (долгота)":98.67752,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":65,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Ko Yao Yai","Координаты острова (широта)":7.97,"Координаты острова (долгота)":98.59,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":66,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Koh Lanta","Координаты острова (широта)":7.53,"Координаты острова (долгота)":99.09,"Расстояние (км)":83.34,"Время - Моторная яхта (мин)":135},
            {"№":67,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Lipe Island","Координаты острова (широта)":6.49,"Координаты острова (долгота)":99.3,"Расстояние (км)":185.2,"Время - Моторная яхта (мин)":300},
            {"№":68,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Similan Islands","Координаты острова (широта)":8.65251,"Координаты острова (долгота)":97.64503,"Расстояние (км)":120.38,"Время - Моторная яхта (мин)":195},
            {"№":69,"Пирс отправления":"Chalong, Phuket","Координаты пирса (широта)":7.8197578,"Координаты пирса (долгота)":98.3495954,"Остров назначения":"Surins Islands","Координаты острова (широта)":8.73,"Координаты острова (долгота)":97.87,"Расстояние (км)":129.64,"Время - Моторная яхта (мин)":210},
            {"№":70,"Пирс отправления":"CoCo pier, Phuket","Координаты пирса (широта)":7.8233662,"Координаты пирса (долгота)":98.4036477,"Остров назначения":"Coral Island","Координаты острова (широта)":7.7407852,"Координаты острова (долгота)":98.3614811,"Расстояние (км)":9.26,"Время - Моторная яхта (мин)":15},
            {"№":71,"Пирс отправления":"CoCo pier, Phuket","Координаты пирса (широта)":7.8233662,"Координаты пирса (долгота)":98.4036477,"Остров назначения":"Promthep Cape","Координаты острова (широта)":7.76,"Координаты острова (долгота)":98.3,"Расстояние (км)":9.26,"Время - Моторная яхта (мин)":15},
            {"№":72,"Пирс отправления":"CoCo pier, Phuket","Координаты пирса (широта)":7.8233662,"Координаты пирса (долгота)":98.4036477,"Остров назначения":"Maiton Island","Координаты острова (широта)":7.765062,"Координаты острова (долгота)":98.479373,"Расстояние (км)":9.26,"Время - Моторная яхта (мин)":15},
            {"№":73,"Пирс отправления":"CoCo pier, Phuket","Координаты пирса (широта)":7.8233662,"Координаты пирса (долгота)":98.4036477,"Остров назначения":"Khai Island","Координаты острова (широта)":7.891,"Координаты острова (долгота)":98.5154634,"Расстояние (км)":18.52,"Время - Моторная яхта (мин)":30},
            {"№":74,"Пирс отправления":"CoCo pier, Phuket","Координаты пирса (широта)":7.8233662,"Координаты пирса (долгота)":98.4036477,"Остров назначения":"Racha Yai Island","Координаты острова (широта)":7.61,"Координаты острова (долгота)":98.37,"Расстояние (км)":22.224,"Время - Моторная яхта (мин)":36},
            {"№":75,"Пирс отправления":"CoCo pier, Phuket","Координаты пирса (широта)":7.8233662,"Координаты пирса (долгота)":98.4036477,"Остров назначения":"Phi Phi Islands","Координаты острова (широта)":7.74,"Координаты острова (долгота)":98.77,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":76,"Пирс отправления":"CoCo pier, Phuket","Координаты пирса (широта)":7.8233662,"Координаты пирса (долгота)":98.4036477,"Остров назначения":"James Bond Island","Координаты острова (широта)":8.27448,"Координаты острова (долгота)":98.50109,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":77,"Пирс отправления":"CoCo pier, Phuket","Координаты пирса (широта)":7.8233662,"Координаты пирса (долгота)":98.4036477,"Остров назначения":"Krabi Islands","Координаты острова (широта)":8.01,"Координаты острова (долгота)":98.84,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":78,"Пирс отправления":"Takola Marina, Krabi","Координаты пирса (широта)":8.0434593,"Координаты пирса (долгота)":98.8958387,"Остров назначения":"Poda Island","Координаты острова (широта)":7.9708438,"Координаты острова (долгота)":98.8058077,"Расстояние (км)":18.52,"Время - Моторная яхта (мин)":30},
            {"№":79,"Пирс отправления":"Takola Marina, Krabi","Координаты пирса (широта)":8.0434593,"Координаты пирса (долгота)":98.8958387,"Остров назначения":"Railay Beach","Координаты острова (широта)":8.01,"Координаты острова (долгота)":98.84,"Расстояние (км)":9.26,"Время - Моторная яхта (мин)":15},
            {"№":80,"Пирс отправления":"Takola Marina, Krabi","Координаты пирса (широта)":8.0434593,"Координаты пирса (долгота)":98.8958387,"Остров назначения":"Hong Krabi","Координаты острова (широта)":8.0785,"Координаты острова (долгота)":98.67804,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":81,"Пирс отправления":"Takola Marina, Krabi","Координаты пирса (широта)":8.0434593,"Координаты пирса (долгота)":98.8958387,"Остров назначения":"Lao La Ding Island","Координаты острова (широта)":8.10331,"Координаты острова (долгота)":98.68244,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":82,"Пирс отправления":"Takola Marina, Krabi","Координаты пирса (широта)":8.0434593,"Координаты пирса (долгота)":98.8958387,"Остров назначения":"Pakbia Island","Координаты острова (широта)":8.11798,"Координаты острова (долгота)":98.67752,"Расстояние (км)":24.076,"Время - Моторная яхта (мин)":39},
            {"№":83,"Пирс отправления":"Takola Marina, Krabi","Координаты пирса (широта)":8.0434593,"Координаты пирса (долгота)":98.8958387,"Остров назначения":"Rai Island(Pakbia2)","Координаты острова (широта)":8.12024,"Координаты острова (долгота)":98.67922,"Расстояние (км)":25.928,"Время - Моторная яхта (мин)":42},
            {"№":84,"Пирс отправления":"Takola Marina, Krabi","Координаты пирса (широта)":8.0434593,"Координаты пирса (долгота)":98.8958387,"Остров назначения":"Phi Phi Islands","Координаты острова (широта)":7.74,"Координаты острова (долгота)":98.77,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":85,"Пирс отправления":"Thalane Pier, Krabi","Координаты пирса (широта)":8.1454005,"Координаты пирса (долгота)":98.7482112,"Остров назначения":"Hong Krabi","Координаты острова (широта)":8.0785,"Координаты острова (долгота)":98.67804,"Расстояние (км)":14.816,"Время - Моторная яхта (мин)":24},
            {"№":86,"Пирс отправления":"Thalane Pier, Krabi","Координаты пирса (широта)":8.1454005,"Координаты пирса (долгота)":98.7482112,"Остров назначения":"Lao La Ding Island","Координаты острова (широта)":8.10331,"Координаты острова (долгота)":98.68244,"Расстояние (км)":14.816,"Время - Моторная яхта (мин)":24},
            {"№":87,"Пирс отправления":"Thap Lamu, Phuket","Координаты пирса (широта)":8.5702642,"Координаты пирса (долгота)":98.2232992,"Остров назначения":"Similan Islands","Координаты острова (широта)":8.65251,"Координаты острова (долгота)":97.64503,"Расстояние (км)":74.08,"Время - Моторная яхта (мин)":120},
            {"№":88,"Пирс отправления":"Visit Panwa","Координаты пирса (широта)":7.8296842,"Координаты пирса (долгота)":98.4055261,"Остров назначения":"Coral Island","Координаты острова (широта)":7.7407852,"Координаты острова (долгота)":98.3614811,"Расстояние (км)":5.556,"Время - Моторная яхта (мин)":9},
            {"№":89,"Пирс отправления":"Visit Panwa","Координаты пирса (широта)":7.8296842,"Координаты пирса (долгота)":98.4055261,"Остров назначения":"Racha Island","Координаты острова (широта)":7.61,"Координаты острова (долгота)":98.37,"Расстояние (км)":22.224,"Время - Моторная яхта (мин)":36},
            {"№":90,"Пирс отправления":"Visit Panwa","Координаты пирса (широта)":7.8296842,"Координаты пирса (долгота)":98.4055261,"Остров назначения":"Ko Kai (Chicken Island)","Координаты острова (широта)":7.9539974,"Координаты острова (долгота)":98.8019428,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":91,"Пирс отправления":"Visit Panwa","Координаты пирса (широта)":7.8296842,"Координаты пирса (долгота)":98.4055261,"Остров назначения":"Maiton Island","Координаты острова (широта)":7.788516,"Координаты острова (долгота)":98.433213,"Расстояние (км)":3.704,"Время - Моторная яхта (мин)":6},
            {"№":92,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Phang Nga Bay","Координаты острова (широта)":8.21638,"Координаты острова (долгота)":98.50799,"Расстояние (км)":22.224,"Время - Моторная яхта (мин)":36},
            {"№":93,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Krabi Islands","Координаты острова (широта)":8.01,"Координаты острова (долгота)":98.84,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":94,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Maiton Island","Координаты острова (широта)":7.765062,"Координаты острова (долгота)":98.479373,"Расстояние (км)":46.3,"Время - Моторная яхта (мин)":75},
            {"№":95,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Similan Islands","Координаты острова (широта)":8.6010573,"Координаты острова (долгота)":97.7044008,"Расстояние (км)":83.34,"Время - Моторная яхта (мин)":135},
            {"№":96,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Racha Yai Island","Координаты острова (широта)":7.61,"Координаты острова (долгота)":98.37,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":97,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Racha Noi Island","Координаты острова (широта)":7.55,"Координаты острова (долгота)":98.35,"Расстояние (км)":74.08,"Время - Моторная яхта (мин)":120},
            {"№":98,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Khai Island","Координаты острова (широта)":7.891,"Координаты острова (долгота)":98.5154634,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":99,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Langkawi","Координаты острова (широта)":6.35,"Координаты острова (долгота)":99.8,"Расстояние (км)":277.8,"Время - Моторная яхта (мин)":450},
            {"№":100,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Kawthaung","Координаты острова (широта)":10.05,"Координаты острова (долгота)":98.55,"Расстояние (км)":222.24,"Время - Моторная яхта (мин)":360},
            {"№":101,"Пирс отправления":"Yacht Haven Marina","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Myanmar","Координаты острова (широта)":11.0406162,"Координаты острова (долгота)":98.0670814,"Расстояние (км)":740.8,"Время - Моторная яхта (мин)":1200},
            {"№":102,"Пирс отправления":"Yacht Haven Marine, Phuket","Координаты пирса (широта)":8.1702793,"Координаты пирса (долгота)":98.3394456,"Остров назначения":"Singapore","Координаты острова (широта)":1.35,"Координаты острова (долгота)":103.82,"Расстояние (км)":1111.2,"Время - Моторная яхта (мин)":1800},
            {"№":103,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Phang Nga Bay","Координаты острова (широта)":8.21638,"Координаты острова (долгота)":98.50799,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":104,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Khai Island","Координаты острова (широта)":7.891,"Координаты острова (долгота)":98.5154634,"Расстояние (км)":11.112,"Время - Моторная яхта (мин)":18},
            {"№":105,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Naka Island","Координаты острова (широта)":8.0450874,"Координаты острова (долгота)":98.4586182,"Расстояние (км)":14.816,"Время - Моторная яхта (мин)":24},
            {"№":106,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Maiton Island","Координаты острова (широта)":7.7614853,"Координаты острова (долгота)":98.4785026,"Расстояние (км)":22.224,"Время - Моторная яхта (мин)":36},
            {"№":107,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Phi Phi Islands","Координаты острова (широта)":7.74,"Координаты острова (долгота)":98.77,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105},
            {"№":108,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Racha Yai Islands","Координаты острова (широта)":7.61,"Координаты острова (долгота)":98.37,"Расстояние (км)":55.56,"Время - Моторная яхта (мин)":90},
            {"№":109,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Hong Krabi","Координаты острова (широта)":8.0785,"Координаты острова (долгота)":98.67804,"Расстояние (км)":31.484,"Время - Моторная яхта (мин)":51},
            {"№":110,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Coral Island","Координаты острова (широта)":7.7407852,"Координаты острова (долгота)":98.3614811,"Расстояние (км)":27.78,"Время - Моторная яхта (мин)":45},
            {"№":111,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Surin Island","Координаты острова (широта)":9.40496,"Координаты острова (долгота)":97.85987,"Расстояние (км)":129.64,"Время - Моторная яхта (мин)":210},
            {"№":112,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Similan Islands","Координаты острова (широта)":8.65251,"Координаты острова (долгота)":97.64503,"Расстояние (км)":120.38,"Время - Моторная яхта (мин)":195},
            {"№":113,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"James Bond Island","Координаты острова (широта)":8.27448,"Координаты острова (долгота)":98.50109,"Расстояние (км)":37.04,"Время - Моторная яхта (мин)":60},
            {"№":114,"Пирс отправления":"Royal Phuket Marina","Координаты пирса (широта)":7.9671162,"Координаты пирса (долгота)":98.3907645,"Остров назначения":"Bamboo Island","Координаты острова (широта)":7.8167,"Координаты острова (долгота)":98.79546,"Расстояние (км)":64.82,"Время - Моторная яхта (мин)":105} 
                    ];
// Готовые маршруты (с правильными названиями пирсов из данных)
const PRESET_ROUTES = {
    'phuket-classic': {
        name: 'Классический Пхукет',
        description: 'Самые популярные острова рядом с Пхукетом',
        duration: '1 день',
        difficulty: 'Легкий',
        pier: 'Ao Po Grand Marina',
        islands: ['Coral Island', 'Khai Nok Island', 'Racha Yai Island']
    },
    'james-bond': {
        name: 'Джеймс Бонд тур',
        description: 'Знаменитые локации из фильмов',
        duration: '1 день',
        difficulty: 'Легкий',
        pier: 'Ao Po Grand Marina',
        islands: ['James Bond Island', 'Phang Nga Bay']
    },
    'diving': {
        name: 'Дайвинг экспедиция',
        description: 'Лучшие места для дайвинга',
        duration: '2 дня',
        difficulty: 'Средний',
        pier: 'Ao Po Grand Marina',
        islands: ['Phi Phi Islands', 'Similan Islands']
    },
    'krabi-explorer': {
        name: 'Исследователь Краби',
        description: 'Красивые острова провинции Краби',
        duration: '1 день',
        difficulty: 'Легкий',
        pier: 'Takola Marina, Krabi',
        islands: ['Poda Island', 'Railay Beach', 'Hong Krabi']
    },
    'short-trip': {
        name: 'Короткая прогулка',
        description: 'Близкие острова для быстрой поездки',
        duration: '4 часа',
        difficulty: 'Легкий',
        pier: 'Chalong, Phuket',
        islands: ['Coral Island', 'Maiton Island']
    },
    'boat-lagoon': {
        name: 'Прогулка от Boat Lagoon',
        description: 'Близкие маршруты от яхтенной марины',
        duration: '6 часов',
        difficulty: 'Легкий',
        pier: 'Boat Lagoon, Phuket',
        islands: ['Rang Yai Island', 'Khai Nok Island', 'Naka Island']
    }
};



        // Скорости лодок (узлы)
        const VESSEL_SPEEDS = {
            motorYacht: 20,
            motorCatamaran: 15,
            sailCatamaran: 8,
            speedboat: 30,
            fishingBoat: 10
        };

        
               // В данных погоды замените:
const WEATHER_OPTIONS = [
    { condition: 'Солнечно', icon: '☀️', temp: 32, wind: 0.5, waves: 0.3 },
    { condition: 'Облачно', icon: '☁️', temp: 30, wind: 0.8, waves: 0.4 },
    { condition: 'Ясно', icon: '☀️', temp: 31, wind: 0.6, waves: 0.2 },
    { condition: 'Идеально', icon: '⭐', temp: 29, wind: 0.4, waves: 0.2 },
    { condition: 'Прекрасно', icon: '✨', temp: 33, wind: 0.7, waves: 0.3 }
];


        // Сезоны с правильными периодами
        const SEASONS = {
            all: { name: 'Все сезоны' },
            high: { name: 'Высокий сезон', periods: [
                { start: '01-11', end: '19-12' },
                { start: '11-01', end: '30-04' }
            ], color: 'season-high' },
            low: { name: 'Низкий сезон', periods: [
                { start: '01-05', end: '31-10' }
            ], color: 'season-low' },
            peak: { name: 'Пиковый сезон', periods: [
                { start: '20-12', end: '10-01' }
            ], color: 'season-peak' }
        };

        // Глобальные переменные
        let allBoats = [];
        let currentBoats = [];
        let favoriteBoats = new Set();
        let fullRouteInfo = null;
        let map = null;
        let mapInitialized = false;
        let polyline = null;
        let markers = [];
        let routeNumbers = [];
        let currentSeasonFilter = 'all';
        let isDarkTheme = false;

        // Загрузка Google Maps
        function loadGoogleMaps() {
            if (mapInitialized || window.google) return;

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initOnlySeaMap&libraries=geometry,marker&v=weekly&loading=async`;
            script.async = true;
            script.defer = true;
            script.onerror = () => {
                console.error('Failed to load Google Maps');
                initializeApp();
            };
            document.head.appendChild(script);
        }

        // Инициализация Google Maps
        window.initOnlySeaMap = function() {
            console.log('Инициализация Google Maps...');
            mapInitialized = true;

            try {
                const phuketCenter = { lat: 7.8804, lng: 98.3923 };
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 10,
                    center: phuketCenter,
                    mapTypeId: google.maps.MapTypeId.HYBRID,
                    styles: [
                        {
                            "elementType": "geometry",
                            "stylers": [{"color": "#f5f5f5"}]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [{"color": "#616161"}]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [{"color": "#f5f5f5"}]
                        }
                    ]
                });

                console.log('Google Maps успешно инициализирован');
                initializeApp();
            } catch (error) {
                console.error('Error initializing map:', error);
                initializeApp();
            }
        };

        // Получение названия типа лодки
        function getBoatTypeName(type) {
            if (!type) return 'Не указан';

            const typeMap = {
                'motorYacht': 'Моторная яхта',
                'motorCatamaran': 'Моторный катамаран',
                'sailCatamaran': 'Парусный катамаран',
                'speedboat': 'Спидбоат',
                'fishingBoat': 'Рыбацкая лодка',
                'яхта': 'Моторная яхта',
                'катамаран': 'Моторный катамаран',
                'motor yacht': 'Моторная яхта',
                'motor catamaran': 'Моторный катамаран',
                'sail catamaran': 'Парусный катамаран',
                'speed boat': 'Спидбоат',
                'fishing boat': 'Рыбацкая лодка'
            };

            const normalizedType = type.toString().toLowerCase();
            for (const [key, value] of Object.entries(typeMap)) {
                if (normalizedType.includes(key.toLowerCase())) {
                    return value;
                }
            }

            return type;
        }

        // Получение ключа типа лодки
        function getBoatTypeKey(type) {
            if (!type) return '';

            const typeMap = {
                'Motor Yacht': 'motorYacht',
                'Motor Catamaran': 'motorCatamaran',
                'Sail Catamaran': 'sailCatamaran',
                'Speedboat': 'speedboat',
                'Рыбацкая лодка': 'fishingBoat',
                'Яхта': 'motorYacht',
                'Катамаран': 'motorCatamaran',
                'Парусный катамаран': 'sailCatamaran',
                'Спидбоат': 'speedboat',
                'motor yacht': 'motorYacht',
                'motor catamaran': 'motorCatamaran',
                'sail catamaran': 'sailCatamaran',
                'speed boat': 'speedboat',
                'fishing boat': 'fishingBoat'
            };

            const normalizedType = type.toString().toLowerCase();
            for (const [key, value] of Object.entries(typeMap)) {
                if (normalizedType.includes(key.toLowerCase())) {
                    return value;
                }
            }
            return '';
        }

   <script>
        // Определение сезона по дате
        function getSeasonByDate(dateText) {
            if (!dateText) return 'all';
            
            const text = dateText.toString().toLowerCase();
            
            // Проверка на пиковый сезон (20 декабря - 10 января)
            if (text.includes('20.12') || text.includes('20/12') || text.includes('20 dec') ||
                text.includes('21.12') || text.includes('21/12') || text.includes('21 dec') ||
                text.includes('22.12') || text.includes('22/12') || text.includes('22 dec') ||
                text.includes('23.12') || text.includes('23/12') || text.includes('23 dec') ||
                text.includes('24.12') || text.includes('24/12') || text.includes('24 dec') ||
                text.includes('25.12') || text.includes('25/12') || text.includes('25 dec') ||
                text.includes('26.12') || text.includes('26/12') || text.includes('26 dec') ||
                text.includes('27.12') || text.includes('27/12') || text.includes('27 dec') ||
                text.includes('28.12') || text.includes('28/12') || text.includes('28 dec') ||
                text.includes('29.12') || text.includes('29/12') || text.includes('29 dec') ||
                text.includes('30.12') || text.includes('30/12') || text.includes('30 dec') ||
                text.includes('31.12') || text.includes('31/12') || text.includes('31 dec') ||
                text.includes('01.01') || text.includes('01/01') || text.includes('1 jan') ||
                text.includes('02.01') || text.includes('02/01') || text.includes('2 jan') ||
                text.includes('03.01') || text.includes('03/01') || text.includes('3 jan') ||
                text.includes('04.01') || text.includes('04/01') || text.includes('4 jan') ||
                text.includes('05.01') || text.includes('05/01') || text.includes('5 jan') ||
                text.includes('06.01') || text.includes('06/01') || text.includes('6 jan') ||
                text.includes('07.01') || text.includes('07/01') || text.includes('7 jan') ||
                text.includes('08.01') || text.includes('08/01') || text.includes('8 jan') ||
                text.includes('09.01') || text.includes('09/01') || text.includes('9 jan') ||
                text.includes('10.01') || text.includes('10/01') || text.includes('10 jan') ||
                text.includes('peak') || text.includes('пик') || text.includes('хот') || text.includes('hot')) {
                return 'peak';
            }
            
            // Проверка на высокий сезон (1 ноября - 19 декабря и 11 января - 30 апреля)
            if (text.includes('01.11') || text.includes('01/11') || text.includes('1 nov') ||
                text.includes('02.11') || text.includes('02/11') || text.includes('2 nov') ||
                text.includes('03.11') || text.includes('03/11') || text.includes('3 nov') ||
                text.includes('04.11') || text.includes('04/11') || text.includes('4 nov') ||
                text.includes('05.11') || text.includes('05/11') || text.includes('5 nov') ||
                text.includes('06.11') || text.includes('06/11') || text.includes('6 nov') ||
                text.includes('07.11') || text.includes('07/11') || text.includes('7 nov') ||
                text.includes('08.11') || text.includes('08/11') || text.includes('8 nov') ||
                text.includes('09.11') || text.includes('09/11') || text.includes('9 nov') ||
                text.includes('10.11') || text.includes('10/11') || text.includes('10 nov') ||
                text.includes('11.11') || text.includes('11/11') || text.includes('11 nov') ||
                text.includes('12.11') || text.includes('12/11') || text.includes('12 nov') ||
                text.includes('13.11') || text.includes('13/11') || text.includes('13 nov') ||
                text.includes('14.11') || text.includes('14/11') || text.includes('14 nov') ||
                text.includes('15.11') || text.includes('15/11') || text.includes('15 nov') ||
                text.includes('16.11') || text.includes('16/11') || text.includes('16 nov') ||
                text.includes('17.11') || text.includes('17/11') || text.includes('17 nov') ||
                text.includes('18.11') || text.includes('18/11') || text.includes('18 nov') ||
                text.includes('19.11') || text.includes('19/11') || text.includes('19 nov') ||
                text.includes('20.11') || text.includes('20/11') || text.includes('20 nov') ||
                text.includes('21.11') || text.includes('21/11') || text.includes('21 nov') ||
                text.includes('22.11') || text.includes('22/11') || text.includes('22 nov') ||
                text.includes('23.11') || text.includes('23/11') || text.includes('23 nov') ||
                text.includes('24.11') || text.includes('24/11') || text.includes('24 nov') ||
                text.includes('25.11') || text.includes('25/11') || text.includes('25 nov') ||
                text.includes('26.11') || text.includes('26/11') || text.includes('26 nov') ||
                text.includes('27.11') || text.includes('27/11') || text.includes('27 nov') ||
                text.includes('28.11') || text.includes('28/11') || text.includes('28 nov') ||
                text.includes('29.11') || text.includes('29/11') || text.includes('29 nov') ||
                text.includes('30.11') || text.includes('30/11') || text.includes('30 nov') ||
                text.includes('01.12') || text.includes('01/12') || text.includes('1 dec') ||
                text.includes('02.12') || text.includes('02/12') || text.includes('2 dec') ||
                text.includes('03.12') || text.includes('03/12') || text.includes('3 dec') ||
                text.includes('04.12') || text.includes('04/12') || text.includes('4 dec') ||
                text.includes('05.12') || text.includes('05/12') || text.includes('5 dec') ||
                text.includes('06.12') || text.includes('06/12') || text.includes('6 dec') ||
                text.includes('07.12') || text.includes('07/12') || text.includes('7 dec') ||
                text.includes('08.12') || text.includes('08/12') || text.includes('8 dec') ||
                text.includes('09.12') || text.includes('09/12') || text.includes('9 dec') ||
                text.includes('10.12') || text.includes('10/12') || text.includes('10 dec') ||
                text.includes('11.12') || text.includes('11/12') || text.includes('11 dec') ||
                text.includes('12.12') || text.includes('12/12') || text.includes('12 dec') ||
                text.includes('13.12') || text.includes('13/12') || text.includes('13 dec') ||
                text.includes('14.12') || text.includes('14/12') || text.includes('14 dec') ||
                text.includes('15.12') || text.includes('15/12') || text.includes('15 dec') ||
                text.includes('16.12') || text.includes('16/12') || text.includes('16 dec') ||
                text.includes('17.12') || text.includes('17/12') || text.includes('17 dec') ||
                text.includes('18.12') || text.includes('18/12') || text.includes('18 dec') ||
                text.includes('19.12') || text.includes('19/12') || text.includes('19 dec') ||
                text.includes('11.01') || text.includes('11/01') || text.includes('11 jan') ||
                text.includes('12.01') || text.includes('12/01') || text.includes('12 jan') ||
                text.includes('13.01') || text.includes('13/01') || text.includes('13 jan') ||
                text.includes('14.01') || text.includes('14/01') || text.includes('14 jan') ||
                text.includes('15.01') || text.includes('15/01') || text.includes('15 jan') ||
                text.includes('16.01') || text.includes('16/01') || text.includes('16 jan') ||
                text.includes('17.01') || text.includes('17/01') || text.includes('17 jan') ||
                text.includes('18.01') || text.includes('18/01') || text.includes('18 jan') ||
                text.includes('19.01') || text.includes('19/01') || text.includes('19 jan') ||
                text.includes('20.01') || text.includes('20/01') || text.includes('20 jan') ||
                text.includes('21.01') || text.includes('21/01') || text.includes('21 jan') ||
                text.includes('22.01') || text.includes('22/01') || text.includes('22 jan') ||
                text.includes('23.01') || text.includes('23/01') || text.includes('23 jan') ||
                text.includes('24.01') || text.includes('24/01') || text.includes('24 jan') ||
                text.includes('25.01') || text.includes('25/01') || text.includes('25 jan') ||
                text.includes('26.01') || text.includes('26/01') || text.includes('26 jan') ||
                text.includes('27.01') || text.includes('27/01') || text.includes('27 jan') ||
                text.includes('28.01') || text.includes('28/01') || text.includes('28 jan') ||
                text.includes('29.01') || text.includes('29/01') || text.includes('29 jan') ||
                text.includes('30.01') || text.includes('30/01') || text.includes('30 jan') ||
                text.includes('31.01') || text.includes('31/01') || text.includes('31 jan') ||
                text.includes('01.02') || text.includes('01/02') || text.includes('1 feb') ||
                text.includes('02.02') || text.includes('02/02') || text.includes('2 feb') ||
                text.includes('03.02') || text.includes('03/02') || text.includes('3 feb') ||
                text.includes('04.02') || text.includes('04/02') || text.includes('4 feb') ||
                text.includes('05.02') || text.includes('05/02') || text.includes('5 feb') ||
                text.includes('06.02') || text.includes('06/02') || text.includes('6 feb') ||
                text.includes('07.02') || text.includes('07/02') || text.includes('7 feb') ||
                text.includes('08.02') || text.includes('08/02') || text.includes('8 feb') ||
                text.includes('09.02') || text.includes('09/02') || text.includes('9 feb') ||
                text.includes('10.02') || text.includes('10/02') || text.includes('10 feb') ||
                text.includes('11.02') || text.includes('11/02') || text.includes('11 feb') ||
                text.includes('12.02') || text.includes('12/02') || text.includes('12 feb') ||
                text.includes('13.02') || text.includes('13/02') || text.includes('13 feb') ||
                text.includes('14.02') || text.includes('14/02') || text.includes('14 feb') ||
                text.includes('15.02') || text.includes('15/02') || text.includes('15 feb') ||
                text.includes('16.02') || text.includes('16/02') || text.includes('16 feb') ||
                text.includes('17.02') || text.includes('17/02') || text.includes('17 feb') ||
                text.includes('18.02') || text.includes('18/02') || text.includes('18 feb') ||
                text.includes('19.02') || text.includes('19/02') || text.includes('19 feb') ||
                text.includes('20.02') || text.includes('20/02') || text.includes('20 feb') ||
                text.includes('21.02') || text.includes('21/02') || text.includes('21 feb') ||
                text.includes('22.02') || text.includes('22/02') || text.includes('22 feb') ||
                text.includes('23.02') || text.includes('23/02') || text.includes('23 feb') ||
                text.includes('24.02') || text.includes('24/02') || text.includes('24 feb') ||
                text.includes('25.02') || text.includes('25/02') || text.includes('25 feb') ||
                text.includes('26.02') || text.includes('26/02') || text.includes('26 feb') ||
                text.includes('27.02') || text.includes('27/02') || text.includes('27 feb') ||
                text.includes('28.02') || text.includes('28/02') || text.includes('28 feb') ||
                text.includes('01.03') || text.includes('01/03') || text.includes('1 mar') ||
                text.includes('02.03') || text.includes('02/03') || text.includes('2 mar') ||
                text.includes('03.03') || text.includes('03/03') || text.includes('3 mar') ||
                text.includes('04.03') || text.includes('04/03') || text.includes('4 mar') ||
                text.includes('05.03') || text.includes('05/03') || text.includes('5 mar') ||
                text.includes('06.03') || text.includes('06/03') || text.includes('6 mar') ||
                text.includes('07.03') || text.includes('07/03') || text.includes('7 mar') ||
                text.includes('08.03') || text.includes('08/03') || text.includes('8 mar') ||
                text.includes('09.03') || text.includes('09/03') || text.includes('9 mar') ||
                text.includes('10.03') || text.includes('10/03') || text.includes('10 mar') ||
                text.includes('11.03') || text.includes('11/03') || text.includes('11 mar') ||
                text.includes('12.03') || text.includes('12/03') || text.includes('12 mar') ||
                text.includes('13.03') || text.includes('13/03') || text.includes('13 mar') ||
                text.includes('14.03') || text.includes('14/03') || text.includes('14 mar') ||
                text.includes('15.03') || text.includes('15/03') || text.includes('15 mar') ||
                text.includes('16.03') || text.includes('16/03') || text.includes('16 mar') ||
                text.includes('17.03') || text.includes('17/03') || text.includes('17 mar') ||
                text.includes('18.03') || text.includes('18/03') || text.includes('18 mar') ||
                text.includes('19.03') || text.includes('19/03') || text.includes('19 mar') ||
                text.includes('20.03') || text.includes('20/03') || text.includes('20 mar') ||
                text.includes('21.03') || text.includes('21/03') || text.includes('21 mar') ||
                text.includes('22.03') || text.includes('22/03') || text.includes('22 mar') ||
                text.includes('23.03') || text.includes('23/03') || text.includes('23 mar') ||
                text.includes('24.03') || text.includes('24/03') || text.includes('24 mar') ||
                text.includes('25.03') || text.includes('25/03') || text.includes('25 mar') ||
                text.includes('26.03') || text.includes('26/03') || text.includes('26 mar') ||
                text.includes('27.03') || text.includes('27/03') || text.includes('27 mar') ||
                text.includes('28.03') || text.includes('28/03') || text.includes('28 mar') ||
                text.includes('29.03') || text.includes('29/03') || text.includes('29 mar') ||
                text.includes('30.03') || text.includes('30/03') || text.includes('30 mar') ||
                text.includes('31.03') || text.includes('31/03') || text.includes('31 mar') ||
                text.includes('01.04') || text.includes('01/04') || text.includes('1 apr') ||
                text.includes('02.04') || text.includes('02/04') || text.includes('2 apr') ||
                text.includes('03.04') || text.includes('03/04') || text.includes('3 apr') ||
                text.includes('04.04') || text.includes('04/04') || text.includes('4 apr') ||
                text.includes('05.04') || text.includes('05/04') || text.includes('5 apr') ||
                text.includes('06.04') || text.includes('06/04') || text.includes('6 apr') ||
                text.includes('07.04') || text.includes('07/04') || text.includes('7 apr') ||
                text.includes('08.04') || text.includes('08/04') || text.includes('8 apr') ||
                text.includes('09.04') || text.includes('09/04') || text.includes('9 apr') ||
                text.includes('10.04') || text.includes('10/04') || text.includes('10 apr') ||
                text.includes('11.04') || text.includes('11/04') || text.includes('11 apr') ||
                text.includes('12.04') || text.includes('12/04') || text.includes('12 apr') ||
                text.includes('13.04') || text.includes('13/04') || text.includes('13 apr') ||
                text.includes('14.04') || text.includes('14/04') || text.includes('14 apr') ||
                text.includes('15.04') || text.includes('15/04') || text.includes('15 apr') ||
                text.includes('16.04') || text.includes('16/04') || text.includes('16 apr') ||
                text.includes('17.04') || text.includes('17/04') || text.includes('17 apr') ||
                text.includes('18.04') || text.includes('18/04') || text.includes('18 apr') ||
                text.includes('19.04') || text.includes('19/04') || text.includes('19 apr') ||
                text.includes('20.04') || text.includes('20/04') || text.includes('20 apr') ||
                text.includes('21.04') || text.includes('21/04') || text.includes('21 apr') ||
                text.includes('22.04') || text.includes('22/04') || text.includes('22 apr') ||
                text.includes('23.04') || text.includes('23/04') || text.includes('23 apr') ||
                text.includes('24.04') || text.includes('24/04') || text.includes('24 apr') ||
                text.includes('25.04') || text.includes('25/04') || text.includes('25 apr') ||
                text.includes('26.04') || text.includes('26/04') || text.includes('26 apr') ||
                text.includes('27.04') || text.includes('27/04') || text.includes('27 apr') ||
                text.includes('28.04') || text.includes('28/04') || text.includes('28 apr') ||
                text.includes('29.04') || text.includes('29/04') || text.includes('29 apr') ||
                text.includes('30.04') || text.includes('30/04') || text.includes('30 apr') ||
                text.includes('high') || text.includes('высок') || text.includes('high season')) {
                return 'high';
            }
            
            // Проверка на низкий сезон (1 мая - 31 октября)
            if (text.includes('01.05') || text.includes('01/05') || text.includes('1 may') ||
                text.includes('02.05') || text.includes('02/05') || text.includes('2 may') ||
                text.includes('03.05') || text.includes('03/05') || text.includes('3 may') ||
                text.includes('04.05') || text.includes('04/05') || text.includes('4 may') ||
                text.includes('05.05') || text.includes('05/05') || text.includes('5 may') ||
                text.includes('06.05') || text.includes('06/05') || text.includes('6 may') ||
                text.includes('07.05') || text.includes('07/05') || text.includes('7 may') ||
                text.includes('08.05') || text.includes('08/05') || text.includes('8 may') ||
                text.includes('09.05') || text.includes('09/05') || text.includes('9 may') ||
                text.includes('10.05') || text.includes('10/05') || text.includes('10 may') ||
                text.includes('11.05') || text.includes('11/05') || text.includes('11 may') ||
                text.includes('12.05') || text.includes('12/05') || text.includes('12 may') ||
                text.includes('13.05') || text.includes('13/05') || text.includes('13 may') ||
                text.includes('14.05') || text.includes('14/05') || text.includes('14 may') ||
                text.includes('15.05') || text.includes('15/05') || text.includes('15 may') ||
                text.includes('16.05') || text.includes('16/05') || text.includes('16 may') ||
                text.includes('17.05') || text.includes('17/05') || text.includes('17 may') ||
                text.includes('18.05') || text.includes('18/05') || text.includes('18 may') ||
                text.includes('19.05') || text.includes('19/05') || text.includes('19 may') ||
                text.includes('20.05') || text.includes('20/05') || text.includes('20 may') ||
                text.includes('21.05') || text.includes('21/05') || text.includes('21 may') ||
                text.includes('22.05') || text.includes('22/05') || text.includes('22 may') ||
                text.includes('23.05') || text.includes('23/05') || text.includes('23 may') ||
                text.includes('24.05') || text.includes('24/05') || text.includes('24 may') ||
                text.includes('25.05') || text.includes('25/05') || text.includes('25 may') ||
                text.includes('26.05') || text.includes('26/05') || text.includes('26 may') ||
                text.includes('27.05') || text.includes('27/05') || text.includes('27 may') ||
                text.includes('28.05') || text.includes('28/05') || text.includes('28 may') ||
                text.includes('29.05') || text.includes('29/05') || text.includes('29 may') ||
                text.includes('30.05') || text.includes('30/05') || text.includes('30 may') ||
                text.includes('31.05') || text.includes('31/05') || text.includes('31 may') ||
                text.includes('01.06') || text.includes('01/06') || text.includes('1 jun') ||
                text.includes('02.06') || text.includes('02/06') || text.includes('2 jun') ||
                text.includes('03.06') || text.includes('03/06') || text.includes('3 jun') ||
                text.includes('04.06') || text.includes('04/06') || text.includes('4 jun') ||
                text.includes('05.06') || text.includes('05/06') || text.includes('5 jun') ||
                text.includes('06.06') || text.includes('06/06') || text.includes('6 jun') ||
                text.includes('07.06') || text.includes('07/06') || text.includes('7 jun') ||
                text.includes('08.06') || text.includes('08/06') || text.includes('8 jun') ||
                text.includes('09.06') || text.includes('09/06') || text.includes('9 jun') ||
                text.includes('10.06') || text.includes('10/06') || text.includes('10 jun') ||
                text.includes('11.06') || text.includes('11/06') || text.includes('11 jun') ||
                text.includes('12.06') || text.includes('12/06') || text.includes('12 jun') ||
                text.includes('13.06') || text.includes('13/06') || text.includes('13 jun') ||
                text.includes('14.06') || text.includes('14/06') || text.includes('14 jun') ||
                text.includes('15.06') || text.includes('15/06') || text.includes('15 jun') ||
                text.includes('16.06') || text.includes('16/06') || text.includes('16 jun') ||
                text.includes('17.06') || text.includes('17/06') || text.includes('17 jun') ||
                text.includes('18.06') || text.includes('18/06') || text.includes('18 jun') ||
                text.includes('19.06') || text.includes('19/06') || text.includes('19 jun') ||
                text.includes('20.06') || text.includes('20/06') || text.includes('20 jun') ||
                text.includes('21.06') || text.includes('21/06') || text.includes('21 jun') ||
                text.includes('22.06') || text.includes('22/06') || text.includes('22 jun') ||
                text.includes('23.06') || text.includes('23/06') || text.includes('23 jun') ||
                text.includes('24.06') || text.includes('24/06') || text.includes('24 jun') ||
                text.includes('25.06') || text.includes('25/06') || text.includes('25 jun') ||
                text.includes('26.06') || text.includes('26/06') || text.includes('26 jun') ||
                text.includes('27.06') || text.includes('27/06') || text.includes('27 jun') ||
                text.includes('28.06') || text.includes('28/06') || text.includes('28 jun') ||
                text.includes('29.06') || text.includes('29/06') || text.includes('29 jun') ||
                text.includes('30.06') || text.includes('30/06') || text.includes('30 jun') ||
                text.includes('01.07') || text.includes('01/07') || text.includes('1 jul') ||
                text.includes('02.07') || text.includes('02/07') || text.includes('2 jul') ||
                text.includes('03.07') || text.includes('03/07') || text.includes('3 jul') ||
                text.includes('04.07') || text.includes('04/07') || text.includes('4 jul') ||
                text.includes('05.07') || text.includes('05/07') || text.includes('5 jul') ||
                text.includes('06.07') || text.includes('06/07') || text.includes('6 jul') ||
                text.includes('07.07') || text.includes('07/07') || text.includes('7 jul') ||
                text.includes('08.07') || text.includes('08/07') || text.includes('8 jul') ||
                text.includes('09.07') || text.includes('09/07') || text.includes('9 jul') ||
                text.includes('10.07') || text.includes('10/07') || text.includes('10 jul') ||
                text.includes('11.07') || text.includes('11/07') || text.includes('11 jul') ||
                text.includes('12.07') || text.includes('12/07') || text.includes('12 jul') ||
                text.includes('13.07') || text.includes('13/07') || text.includes('13 jul') ||
                text.includes('14.07') || text.includes('14/07') || text.includes('14 jul') ||
                text.includes('15.07') || text.includes('15/07') || text.includes('15 jul') ||
                text.includes('16.07') || text.includes('16/07') || text.includes('16 jul') ||
                text.includes('17.07') || text.includes('17/07') || text.includes('17 jul') ||
                text.includes('18.07') || text.includes('18/07') || text.includes('18 jul') ||
                text.includes('19.07') || text.includes('19/07') || text.includes('19 jul') ||
                text.includes('20.07') || text.includes('20/07') || text.includes('20 jul') ||
                text.includes('21.07') || text.includes('21/07') || text.includes('21 jul') ||
                text.includes('22.07') || text.includes('22/07') || text.includes('22 jul') ||
                text.includes('23.07') || text.includes('23/07') || text.includes('23 jul') ||
                text.includes('24.07') || text.includes('24/07') || text.includes('24 jul') ||
                text.includes('25.07') || text.includes('25/07') || text.includes('25 jul') ||
                text.includes('26.07') || text.includes('26/07') || text.includes('26 jul') ||
                text.includes('27.07') || text.includes('27/07') || text.includes('27 jul') ||
                text.includes('28.07') || text.includes('28/07') || text.includes('28 jul') ||
                text.includes('29.07') || text.includes('29/07') || text.includes('29 jul') ||
                text.includes('30.07') || text.includes('30/07') || text.includes('30 jul') ||
                text.includes('31.07') || text.includes('31/07') || text.includes('31 jul') ||
                text.includes('01.08') || text.includes('01/08') || text.includes('1 aug') ||
                text.includes('02.08') || text.includes('02/08') || text.includes('2 aug') ||
                text.includes('03.08') || text.includes('03/08') || text.includes('3 aug') ||
                text.includes('04.08') || text.includes('04/08') || text.includes('4 aug') ||
                text.includes('05.08') || text.includes('05/08') || text.includes('5 aug') ||
                text.includes('06.08') || text.includes('06/08') || text.includes('6 aug') ||
                text.includes('07.08') || text.includes('07/08') || text.includes('7 aug') ||
                text.includes('08.08') || text.includes('08/08') || text.includes('8 aug') ||
                text.includes('09.08') || text.includes('09/08') || text.includes('9 aug') ||
                text.includes('10.08') || text.includes('10/08') || text.includes('10 aug') ||
                text.includes('11.08') || text.includes('11/08') || text.includes('11 aug') ||
                text.includes('12.08') || text.includes('12/08') || text.includes('12 aug') ||
                text.includes('13.08') || text.includes('13/08') || text.includes('13 aug') ||
                text.includes('14.08') || text.includes('14/08') || text.includes('14 aug') ||
                text.includes('15.08') || text.includes('15/08') || text.includes('15 aug') ||
                text.includes('16.08') || text.includes('16/08') || text.includes('16 aug') ||
                text.includes('17.08') || text.includes('17/08') || text.includes('17 aug') ||
                text.includes('18.08') || text.includes('18/08') || text.includes('18 aug') ||
                text.includes('19.08') || text.includes('19/08') || text.includes('19 aug') ||
                text.includes('20.08') || text.includes('20/08') || text.includes('20 aug') ||
                text.includes('21.08') || text.includes('21/08') || text.includes('21 aug') ||
                text.includes('22.08') || text.includes('22/08') || text.includes('22 aug') ||
                text.includes('23.08') || text.includes('23/08') || text.includes('23 aug') ||
                text.includes('24.08') || text.includes('24/08') || text.includes('24 aug') ||
                text.includes('25.08') || text.includes('25/08') || text.includes('25 aug') ||
                text.includes('26.08') || text.includes('26/08') || text.includes('26 aug') ||
                text.includes('27.08') || text.includes('27/08') || text.includes('27 aug') ||
                text.includes('28.08') || text.includes('28/08') || text.includes('28 aug') ||
                text.includes('29.08') || text.includes('29/08') || text.includes('29 aug') ||
                text.includes('30.08') || text.includes('30/08') || text.includes('30 aug') ||
                text.includes('31.08') || text.includes('31/08') || text.includes('31 aug') ||
                text.includes('01.09') || text.includes('01/09') || text.includes('1 sep') ||
                text.includes('02.09') || text.includes('02/09') || text.includes('2 sep') ||
                text.includes('03.09') || text.includes('03/09') || text.includes('3 sep') ||
                text.includes('04.09') || text.includes('04/09') || text.includes('4 sep') ||
                text.includes('05.09') || text.includes('05/09') || text.includes('5 sep') ||
                text.includes('06.09') || text.includes('06/09') || text.includes('6 sep') ||
                text.includes('07.09') || text.includes('07/09') || text.includes('7 sep') ||
                text.includes('08.09') || text.includes('08/09') || text.includes('8 sep') ||
                text.includes('09.09') || text.includes('09/09') || text.includes('9 sep') ||
                text.includes('10.09') || text.includes('10/09') || text.includes('10 sep') ||
                text.includes('11.09') || text.includes('11/09') || text.includes('11 sep') ||
                text.includes('12.09') || text.includes('12/09') || text.includes('12 sep') ||
                text.includes('13.09') || text.includes('13/09') || text.includes('13 sep') ||
                text.includes('14.09') || text.includes('14/09') || text.includes('14 sep') ||
                text.includes('15.09') || text.includes('15/09') || text.includes('15 sep') ||
                text.includes('16.09') || text.includes('16/09') || text.includes('16 sep') ||
                text.includes('17.09') || text.includes('17/09') || text.includes('17 sep') ||
                text.includes('18.09') || text.includes('18/09') || text.includes('18 sep') ||
                text.includes('19.09') || text.includes('19/09') || text.includes('19 sep') ||
                text.includes('20.09') || text.includes('20/09') || text.includes('20 sep') ||
                text.includes('21.09') || text.includes('21/09') || text.includes('21 sep') ||
                text.includes('22.09') || text.includes('22/09') || text.includes('22 sep') ||
                text.includes('23.09') || text.includes('23/09') || text.includes('23 sep') ||
                text.includes('24.09') || text.includes('24/09') || text.includes('24 sep') ||
                text.includes('25.09') || text.includes('25/09') || text.includes('25 sep') ||
                text.includes('26.09') || text.includes('26/09') || text.includes('26 sep') ||
                text.includes('27.09') || text.includes('27/09') || text.includes('27 sep') ||
                text.includes('28.09') || text.includes('28/09') || text.includes('28 sep') ||
                text.includes('29.09') || text.includes('29/09') || text.includes('29 sep') ||
                text.includes('30.09') || text.includes('30/09') || text.includes('30 sep') ||
                text.includes('01.10') || text.includes('01/10') || text.includes('1 oct') ||
                text.includes('02.10') || text.includes('02/10') || text.includes('2 oct') ||
                text.includes('03.10') || text.includes('03/10') || text.includes('3 oct') ||
                text.includes('04.10') || text.includes('04/10') || text.includes('4 oct') ||
                text.includes('05.10') || text.includes('05/10') || text.includes('5 oct') ||
                text.includes('06.10') || text.includes('06/10') || text.includes('6 oct') ||
                text.includes('07.10') || text.includes('07/10') || text.includes('7 oct') ||
                text.includes('08.10') || text.includes('08/10') || text.includes('8 oct') ||
                text.includes('09.10') || text.includes('09/10') || text.includes('9 oct') ||
                text.includes('10.10') || text.includes('10/10') || text.includes('10 oct') ||
                text.includes('11.10') || text.includes('11/10') || text.includes('11 oct') ||
                text.includes('12.10') || text.includes('12/10') || text.includes('12 oct') ||
                text.includes('13.10') || text.includes('13/10') || text.includes('13 oct') ||
                text.includes('14.10') || text.includes('14/10') || text.includes('14 oct') ||
                text.includes('15.10') || text.includes('15/10') || text.includes('15 oct') ||
                text.includes('16.10') || text.includes('16/10') || text.includes('16 oct') ||
                text.includes('17.10') || text.includes('17/10') || text.includes('17 oct') ||
                text.includes('18.10') || text.includes('18/10') || text.includes('18 oct') ||
                text.includes('19.10') || text.includes('19/10') || text.includes('19 oct') ||
                text.includes('20.10') || text.includes('20/10') || text.includes('20 oct') ||
                text.includes('21.10') || text.includes('21/10') || text.includes('21 oct') ||
                text.includes('22.10') || text.includes('22/10') || text.includes('22 oct') ||
                text.includes('23.10') || text.includes('23/10') || text.includes('23 oct') ||
                text.includes('24.10') || text.includes('24/10') || text.includes('24 oct') ||
                text.includes('25.10') || text.includes('25/10') || text.includes('25 oct') ||
                text.includes('26.10') || text.includes('26/10') || text.includes('26 oct') ||
                text.includes('27.10') || text.includes('27/10') || text.includes('27 oct') ||
                text.includes('28.10') || text.includes('28/10') || text.includes('28 oct') ||
                text.includes('29.10') || text.includes('29/10') || text.includes('29 oct') ||
                text.includes('30.10') || text.includes('30/10') || text.includes('30 oct') ||
                text.includes('31.10') || text.includes('31/10') || text.includes('31 oct') ||
                text.includes('low') || text.includes('низк') || text.includes('low season')) {
                return 'low';
            }
            
            return 'all';
        }

        // Получение бейджа сезона с цветовой маркировкой
        function getSeasonBadge(boat) {
            const seasonText = boat['Даты сезона'] || boat['Сезон'] || 'Круглый год';
            const season = getSeasonByDate(seasonText);
            
            if (season === 'high') {
                return '<span class="season-badge season-high">Высокий сезон</span>';
            } else if (season === 'low') {
                return '<span class="season-badge season-low">Низкий сезон</span>';
            } else if (season === 'peak') {
                return '<span class="season-badge season-peak">Пиковый сезон</span>';
            } else {
                return '<span class="season-badge season-low">Круглый год</span>';
            }
        }

        // Функция для очистки и форматирования текста "Включено"
        function cleanIncludedText(text) {
            if (!text) return [];
            
            let cleanedText = text.toString()
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/\*+/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            
            // Убираем цветные чекбоксы (символы ✓ с пробелами перед ними)
            cleanedText = cleanedText.replace(/✓\s*/g, '');
            
            // Разделяем на пункты по запятым, но только если после запятой идет текст с большой буквы
            let items = [];
            let currentItem = '';
            
            // Проходим по тексту и разбиваем на пункты
            const sentences = cleanedText.split(/(?<=[.!?])\s+(?=[A-ZА-Я])|,\s*(?=[A-ZА-Я])/);
            
            sentences.forEach(sentence => {
                sentence = sentence.trim();
                if (sentence.length > 0) {
                    // Убираем начальные звездочки, дефисы и т.д.
                    sentence = sentence.replace(/^[\*\-\•\—]\s*/, '');
                    
                    // Добавляем точку в конец если нет знака препинания
                    if (sentence.length > 0 && !/[.!?]$/.test(sentence)) {
                        sentence += '.';
                    }
                    
                    items.push(sentence);
                }
            });
            
            // Если не удалось разбить по сложным правилам, разбиваем по запятым
            if (items.length === 0) {
                items = cleanedText.split(',')
                    .map(item => item.trim())
                    .filter(item => item.length > 0)
                    .map(item => {
                        if (!/[.!?]$/.test(item)) {
                            item += '.';
                        }
                        return item;
                    });
            }
            
            return items.filter(item => 
                item.length > 0 && 
                !item.toLowerCase().includes('не включены') && 
                !item.toLowerCase().includes('не включено') &&
                !item.toLowerCase().includes('не входит')
            );
        }

        // Функция для переключения отображения блока "Включено"
        function toggleIncludedContent(button) {
            const content = button.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            if (isActive) {
                content.classList.remove('active');
                button.querySelector('svg').style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('active');
                button.querySelector('svg').style.transform = 'rotate(90deg)';
            }
        }

        // Инициализация приложения
        async function initializeApp() {
            console.log('Инициализация OnlySea VIP...');

            try {
                const boatsList = document.getElementById('boatsList');
                boatsList.innerHTML = `
                    <div style="text-align: center; color: var(--text-secondary); padding: 32px;">
                        Загрузка лодок...
                        <div class="loading-spinner"></div>
                    </div>
                `;

                // Попробуем загрузить данные с GitHub
                try {
                    const response = await fetch(BOATS_DATA_URL);
                    if (response.ok) {
                        const BOATS_DATA = await response.json();
                        console.log('Данные лодок загружены:', BOATS_DATA.length, 'лодок');
                        
                        // Очищаем и обрабатываем данные
                        allBoats = cleanBoatData(BOATS_DATA).map((boat, index) => ({
                            ...boat,
                            uniqueId: index,
                            Тип: boat.Тип || boat['Boat Type'] || boat['Type'] || 'Не указан',
                            season: getSeasonByDate(boat['Даты сезона'] || boat['Сезон'] || '')
                        }));

                        console.log('Обработано лодок:', allBoats.length);
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } catch (error) {
                    console.error('Ошибка загрузки данных с GitHub:', error);
                    console.log('Используем локальные данные лодок');

                    // Локальные данные для тестирования
                    allBoats = [
                        {
                            "Boat Name": "40YT-BS",
                            "Pier": "Ao Po Grand Marina, Phuket",
                            "Тип": "Яхта",
                            "Ссылка на сайт": "https://onlysea.travel/yacht/tproduct/710908964-746485807161-40yt-bs",
                            "Длина": "40 ft",
                            "Год": "2018",
                            "Макс. чел": 8,
                            "Кают": 1,
                            "Даты сезона": "1 May - 31 Oct",
                            "Длительность": "4 ЧАСА",
                            "Цена": 89000,
                            "Маршрут": "AROUND PHUKET",
                            "Главное фото": "https://static.tildacdn.com/stor3661-3134-4261-b231-373364346438/10627622.png",
                            "Все фото": [
                                "https://static.tildacdn.com/stor3661-3134-4261-b231-373364346438/10627622.png",
                                "https://static.tildacdn.com/stor3435-3436-4033-b230-626665376335/77489338.png"
                            ],
                            "Включено": "*Цена указана за 7 человек с гидом или за 8 человек без гида.<br />*В стоимость 4‑часового тура не включены гид, трансфер и питание.",
                            "uniqueId": 0,
                            "season": "low"
                        },
                        {
                            "Boat Name": "40YT-BS (High Season)",
                            "Pier": "Ao Po Grand Marina, Phuket",
                            "Тип": "Яхта",
                            "Ссылка на сайт": "https://onlysea.travel/yacht/tproduct/710908964-746485807161-40yt-bs",
                            "Длина": "40 ft",
                            "Год": "2018",
                            "Макс. чел": 8,
                            "Кают": 1,
                            "Даты сезона": "1 Nov - 30 Apr",
                            "Длительность": "4 ЧАСА",
                            "Цена": 109000,
                            "Маршрут": "AROUND PHUKET",
                            "Главное фото": "https://static.tildacdn.com/stor3661-3134-4261-b231-373364346438/10627622.png",
                            "Все фото": [
                                "https://static.tildacdn.com/stor3661-3134-4261-b231-373364346438/10627622.png",
                                "https://static.tildacdn.com/stor3435-3436-4033-b230-626665376335/77489338.png"
                            ],
                            "Включено": "*Цена указана за 7 человек с гидом или за 8 человек без гида.<br />*В стоимость 4‑часового тура не включены гид, трансфер и питание.",
                            "uniqueId": 1,
                            "season": "high"
                        },
                        {
                            "Boat Name": "Luxury Catamaran",
                            "Pier": "Ao Po Grand Marina, Phuket",
                            "Тип": "Motor Catamaran",
                            "Ссылка на сайт": "https://onlysea.travel/yacht/tproduct/710908964-746485807161-40yt-bs",
                            "Длина": "65 ft",
                            "Год": "2020",
                            "Макс. чел": 20,
                            "Кают": 4,
                            "Даты сезона": "20 Dec - 10 Jan",
                            "Длительность": "8 ЧАСОВ",
                            "Цена": 150000,
                            "Маршрут": "PHI PHI ISLANDS",
                            "Главное фото": "https://static.tildacdn.com/stor3435-3436-4033-b230-626665376335/77489338.png",
                            "Все фото": [
                                "https://static.tildacdn.com/stor3435-3436-4033-b230-626665376335/77489338.png",
                                "https://static.tildacdn.com/stor6338-6535-4030-a431-616136303330/86021849.jpg"
                            ],
                            "Включено": "Завтрак, обед, снорклинг, трансфер, гид",
                            "uniqueId": 2,
                            "season": "peak"
                        }
                    ];
                }

                currentBoats = allBoats;
                renderPresetRoutes();
                populateSelectors();
                displayBoats(allBoats);
                updateBoatsCount(allBoats.length);
                updateFavoriteCount();
                setupEventListeners();
                setupSeasonFilter();

            } catch (error) {
                console.error('Критическая ошибка:', error);
                alert('Произошла ошибка при инициализации приложения. Пожалуйста, обновите страницу.');
            }
        }

        // Очистка данных лодок
        function cleanBoatData(boats) {
            if (!Array.isArray(boats)) {
                console.error('Некорректный формат данных лодок');
                return [];
            }

            return boats.map((boat, index) => {
                if (!boat) return null;

                const cleanBoat = {
                    ...boat,
                    uniqueId: index,
                    Тип: boat.Тип || boat['Boat Type'] || boat['Type'] || 'Не указан'
                };

                // Очистка текстовых полей
                const textFields = ['Boat Name', 'Маршрут', 'Длительность', 'Даты сезона', 'Сезон', 'Включено', 'Pier'];
                textFields.forEach(field => {
                    if (cleanBoat[field] && typeof cleanBoat[field] === 'string') {
                        cleanBoat[field] = cleanBoat[field]
                            .replace(/&nbsp;/g, ' ')
                            .replace(/<[^>]*>/g, '')
                            .replace(/\s+/g, ' ')
                            .trim();
                    }
                });

                // Конвертация длины в футы если в метрах
                if (cleanBoat.Длина && typeof cleanBoat.Длина === 'string') {
                    const lengthValue = parseFloat(cleanBoat.Длина);
                    if (!isNaN(lengthValue) && cleanBoat.Длина.includes('м')) {
                        cleanBoat.Длина = `${Math.round(lengthValue * 3.28084)} ft`;
                    }
                }

                // Убедимся что валюта THB
                if (!cleanBoat.Currency) {
                    cleanBoat.Currency = 'THB';
                }

                return cleanBoat;
            }).filter(boat => boat !== null);
        }

        // Настройка фильтра по сезону
        function setupSeasonFilter() {
            const seasonButtons = document.querySelectorAll('.season-filter-btn');
            seasonButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const season = this.dataset.season;
                    
                    // Переключаем активное состояние
                    seasonButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Устанавливаем фильтр
                    currentSeasonFilter = season;
                    
                    // Применяем фильтры
                    applyFilters();
                });
            });
        }

        // Применение фильтров
        function applyFilters() {
            let filteredBoats = allBoats;
            
            console.log('Применяем фильтры. Всего лодок:', allBoats.length);
            
            // Фильтр по сезону
            if (currentSeasonFilter && currentSeasonFilter !== 'all') {
                filteredBoats = filteredBoats.filter(boat => {
                    if (!boat) return false;
                    return boat.season === currentSeasonFilter;
                });
                console.log('После фильтра по сезону:', filteredBoats.length);
            }
            
            // Фильтр по типу судна
            const vesselSelect = document.getElementById('vesselSelect');
            if (vesselSelect && vesselSelect.value) {
                const selectedVesselType = vesselSelect.value;
                console.log('Фильтруем по типу судна:', selectedVesselType);
                
                filteredBoats = filteredBoats.filter(boat => {
                    if (!boat || !boat.Тип) return false;
                    
                    const boatTypeKey = getBoatTypeKey(boat.Тип);
                    console.log(`Лодка "${boat['Boat Name']}": тип "${boat.Тип}" -> ключ "${boatTypeKey}"`);
                    
                    // Сравниваем ключи типов
                    return boatTypeKey === selectedVesselType;
                });
                console.log('После фильтра по типу судна:', filteredBoats.length);
            }
            
            // Фильтр по пирсу
            const pierSelect = document.getElementById('pierSelect');
            if (pierSelect && pierSelect.value) {
                const selectedPier = pierSelect.value;
                console.log('Фильтруем по пирсу:', selectedPier);
                
                filteredBoats = filteredBoats.filter(boat => {
                    if (!boat) return false;
                    
                    const boatPier = boat.Pier || boat['Пирс отправления'] || '';
                    console.log(`Лодка "${boat['Boat Name']}": пирс "${boatPier}"`);
                    
                    // Более гибкое сравнение пирсов
                    return isSimilarPier(boatPier, selectedPier);
                });
                console.log('После фильтра по пирсу:', filteredBoats.length);
            }
            
            // Фильтр по поиску
            const searchInput = document.getElementById('boatSearch');
            if (searchInput && searchInput.value.trim() !== '') {
                const searchTerm = searchInput.value.toLowerCase().trim();
                filteredBoats = filteredBoats.filter(boat => {
                    if (!boat) return false;
                    
                    const searchFields = [
                        boat['Boat Name'],
                        boat.Тип,
                        boat.Маршрут,
                        boat.Pier,
                        boat['Пирс отправления'],
                        boat.Длина,
                        boat.Длительность
                    ];
                    
                    return searchFields.some(field => 
                        field && field.toString().toLowerCase().includes(searchTerm)
                    );
                });
                console.log('После поиска:', filteredBoats.length);
            }
            
            currentBoats = filteredBoats;
            displayBoats(currentBoats);
            updateBoatsCount(currentBoats.length);
        }

        // Улучшенная функция сравнения пирсов
        function isSimilarPier(str1, str2) {
            if (!str1 || !str2) return false;

            const normalize = s => s.toString().toLowerCase().trim()
                .replace(/[,\s\-_]+/g, ' ')
                .replace(/ё/gi, 'е')
                .replace(/[^a-z0-9а-я ]/gi, '')
                .replace(/\s+/g, ' ');

            const n1 = normalize(str1);
            const n2 = normalize(str2);

            // Логирование для отладки
            console.log(`Сравниваем пирсы: "${str1}" -> "${n1}" vs "${str2}" -> "${n2}"`);

            return n1.includes(n2) || n2.includes(n1) || n1 === n2;
        }

        // Улучшенная функция получения ключа типа лодки
        function getBoatTypeKey(type) {
            if (!type) return '';

            const typeMap = {
                // Русские названия
                'яхта': 'motorYacht',
                'моторная яхта': 'motorYacht',
                'катамаран': 'motorCatamaran', 
                'моторный катамаран': 'motorCatamaran',
                'парусный катамаран': 'sailCatamaran',
                'спидбоат': 'speedboat',
                'спидбот': 'speedboat',
                'скоростная лодка': 'speedboat',
                'рыбацкая лодка': 'fishingBoat',
                'рыболовная лодка': 'fishingBoat',
                
                // Английские названия
                'yacht': 'motorYacht',
                'motor yacht': 'motorYacht',
                'catamaran': 'motorCatamaran',
                'motor catamaran': 'motorCatamaran',
                'sail catamaran': 'sailCatamaran',
                'speedboat': 'speedboat',
                'speed boat': 'speedboat',
                'fishing boat': 'fishingBoat',
                'fishing': 'fishingBoat'
            };

            const normalizedType = type.toString().toLowerCase().trim();
            console.log(`Определяем ключ для типа: "${type}" -> "${normalizedType}"`);

            // Ищем точное совпадение
            for (const [key, value] of Object.entries(typeMap)) {
                if (normalizedType === key.toLowerCase()) {
                    console.log(`Найдено точное совпадение: ${key} -> ${value}`);
                    return value;
                }
            }

            // Ищем частичное совпадение
            for (const [key, value] of Object.entries(typeMap)) {
                if (normalizedType.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedType)) {
                    console.log(`Найдено частичное совпадение: ${key} -> ${value}`);
                    return value;
                }
            }

            console.log(`Ключ не найден для типа: "${type}"`);
            return '';
        }

        // Заполнение селекторов
        function populateSelectors() {
            const pierSelect = document.getElementById('pierSelect');
            if (!pierSelect) return;

            // Очищаем селектор
            pierSelect.innerHTML = '<option value="">Выберите пирс</option>';

            const piers = [...new Set(ROUTES_DATA.map(route => route['Пирс отправления']))].sort();
            console.log('Заполняем селектор пирсами:', piers);
            
            piers.forEach(pier => {
                const option = document.createElement('option');
                option.value = pier;
                option.textContent = pier;
                pierSelect.appendChild(option);
            });

            console.log('Селектор пирсов заполнен, вариантов:', piers.length);
        }

        // Поиск лодок
        function searchBoats() {
            applyFilters();
        }

        // Отображение лодок
        function displayBoats(boats) {
            const boatsList = document.getElementById('boatsList');
            if (!boatsList) return;

            if (!Array.isArray(boats) || boats.length === 0) {
                boatsList.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 32px;">
                        По вашему запросу лодок не найдено.
                    </div>
                `;
                return;
            }

            boatsList.innerHTML = boats.map(createBoatCard).join('');
        }

        // Создание карточки лодки
        function createBoatCard(boat) {
            if (!boat) return '';

            const isFavorite = favoriteBoats.has(boat.uniqueId);
            const seasonBadge = getSeasonBadge(boat);
            const boatTypeName = getBoatTypeName(boat.Тип);
            
            // Обработка текста "Включено"
            const includedText = boat['Включено'] || '';
            const cleanedIncludedText = cleanIncludedText(includedText);
            const hasIncluded = cleanedIncludedText.length > 0;

            return `
                <div class="boat-card ${isFavorite ? 'ring-2 ring-yellow-400' : ''}" data-boat-unique-id="${boat.uniqueId}">
                    <div style="position: relative; margin-bottom: 16px;">
                        <img src="${boat['Главное фото'] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'}"
                             alt="${boat['Boat Name'] || 'Лодка'}"
                             class="boat-photo"
                             onerror="this.src='https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'">
                        <button class="favorite-btn" style="position: absolute; top: 12px; right: 12px; width: 44px; height: 44px; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" 
     stroke="${isFavorite ? 'var(--accent-primary)' : 'var(--text-secondary)'}" stroke-width="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" 
          ${isFavorite ? 'fill="var(--accent-primary)"' : ''} />
</svg>
                        </button>
                    </div>
                    <h3 style="font-weight: 700; font-size: 18px; color: var(--accent-primary); margin-bottom: 12px;">${boat['Boat Name'] || 'Неизвестная лодка'}</h3>
                    <div class="boat-card-info">
                        <span>Тип:</span><span>${boatTypeName}</span>
                        <span>Маршрут:</span><span>${boat.Маршрут || 'Не указан'}</span>
                        <span>Пирс:</span><span>${boat.Pier || boat['Пирс отправления'] || 'Не указан'}</span>
                        <span>Длина:</span><span>${boat.Длина || '—'}</span>
                        <span>Макс. чел:</span><span>${boat['Макс. чел'] || '—'}</span>
                        <span>Длительность:</span><span>${boat.Длительность || '—'}</span>
                        <span>Сезон:</span><span>${seasonBadge}</span>
                        <span>Цена:</span><span style="color: var(--accent-primary); font-weight: 700;">${boat.Цена || 0} ${boat.Currency || 'THB'}</span>
                    </div>
                    
                    ${hasIncluded ? `
<div style="margin-top: 12px;">
    <button class="included-toggle" onclick="app.toggleIncludedContent(this)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
        </svg>
        Включено в стоимость
    </button>
    <div class="included-content">
        <ul class="included-list">
            ${cleanedIncludedText.map(function(item) {
                // Убираем лишние пробелы и добавляем галочку в начале каждого пункта
                const cleanItem = item.trim().replace(/^✓\s*/, '');
                return '<li class="included-item">' + cleanItem + '</li>';
            }).join('')}
        </ul>
    </div>
</div>
` : ''}
                    
                    <div style="display: flex; gap: 8px; margin-top: 16px;">
                        <button class="photo-btn btn-primary" style="flex: 1;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            Фото
                        </button>
                       ${boat['Ссылка на сайт'] ?
    `<a href="${boat['Ссылка на сайт']}" target="_blank" style="flex: 1;" class="btn-secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
        Сайт
    </a>` :
    `<button style="flex: 1; background: rgba(233, 236, 239, 0.8); color: var(--text-secondary); padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: not-allowed; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid rgba(0,0,0,0.1);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
        Нет сайта
    </button>`
                        }
                    </div>
                </div>
            `;
        }

        // Обновление счетчика лодок
        function updateBoatsCount(count) {
            const boatsCountElement = document.getElementById('boatsCount');
            if (boatsCountElement) {
                boatsCountElement.textContent = `(${count})`;
            }
        }

        // Обновление счетчика избранного
        function updateFavoriteCount() {
            const favoriteCountElement = document.getElementById('favoriteCount');
            if (favoriteCountElement) {
                favoriteCountElement.textContent = favoriteBoats.size;
            }
        }

        // Переключение избранного
        function toggleFavorite(boatUniqueId) {
            if (favoriteBoats.has(boatUniqueId)) {
                favoriteBoats.delete(boatUniqueId);
            } else {
                favoriteBoats.add(boatUniqueId);
            }
            displayBoats(currentBoats);
            updateFavoriteCount();
            
      <script>
        // Показать фотогалерею
        function showPhotoGallery(boatUniqueId) {
            const boat = allBoats.find(b => b.uniqueId === boatUniqueId);
            if (!boat) return;

            const modal = document.getElementById('photoModal');
            const gallery = document.getElementById('photoGallery');
            const title = document.getElementById('photoModalTitle');

            if (!modal || !gallery || !title) return;

            title.textContent = `Фотографии: ${boat['Boat Name'] || 'Лодка'}`;

            let photos = [];
            if (boat['Все фото'] && Array.isArray(boat['Все фото'])) {
                photos = boat['Все фото'].slice(0, 20);
            } else if (boat['Главное фото']) {
                photos = [boat['Главное фото']];
            } else {
                photos = ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'];
            }

            gallery.innerHTML = photos.map((photo, index) => `
                <div class="photo-item" data-photo-url="${photo}">
                    <div style="position: absolute; top: 8px; right: 8px; z-index: 10;">
                        <input type="checkbox" class="photo-checkbox" data-index="${index}" style="width: 18px; height: 18px; cursor: pointer;" />
                    </div>
                    <img src="${photo}"
                         alt="Фото ${index + 1}"
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'">
                </div>
            `).join('');

            modal.classList.add('active');

            // Назначаем обработчики для кнопок скачивания
            document.getElementById('downloadSelectedPhotos').onclick = () => downloadSelectedPhotos(photos);
            document.getElementById('downloadAllPhotos').onclick = () => downloadAllPhotos(photos);
        }

        // Скачать выбранные фотографии
        function downloadSelectedPhotos(photos) {
            const selectedPhotos = [];
            document.querySelectorAll('.photo-checkbox:checked').forEach(checkbox => {
                const index = parseInt(checkbox.dataset.index);
                if (index >= 0 && index < photos.length) {
                    selectedPhotos.push(photos[index]);
                }
            });

            if (selectedPhotos.length === 0) {
                alert('Выберите хотя бы одну фотографию.');
                return;
            }

            downloadPhotosAsZip(selectedPhotos, 'selected_photos');
        }

        // Скачать все фотографии
        function downloadAllPhotos(photos) {
            if (photos.length === 0) {
                alert('Нет фотографий для скачивания.');
                return;
            }
            downloadPhotosAsZip(photos, 'all_photos');
        }

        // Скачать фотографии в ZIP-архиве
        async function downloadPhotosAsZip(photos, zipName) {
            const zip = new JSZip();
            const imgFolder = zip.folder('photos');

            const promises = photos.map(async (url, index) => {
                try {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    const fileName = `photo_${index + 1}.${blob.type.split('/')[1]}`;
                    imgFolder.file(fileName, blob);
                } catch (error) {
                    console.error(`Ошибка при загрузке фотографии ${url}:`, error);
                }
            });

            await Promise.all(promises);

            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, `${zipName}.zip`);
            });
        }

   // Функция для получения SVG иконок
function getWeatherIcon(type) {
    const icons = {
        temperature: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#056676" stroke-width="2">
            <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
        </svg>`,
        wind: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#056676" stroke-width="2">
            <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/>
        </svg>`,
        waves: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#056676" stroke-width="2">
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
        </svg>`
    };
    return icons[type] || '';
}

        // Рендер готовых маршрутов
        function renderPresetRoutes() {
            const container = document.getElementById('presetRoutesContainer');
            if (!container) {
                console.error('Container presetRoutesContainer not found');
                return;
            }

            container.innerHTML = Object.keys(PRESET_ROUTES).map(routeId => {
                const route = PRESET_ROUTES[routeId];
                return `
                    <div class="route-card" data-route="${routeId}">
                        <h3 style="font-weight: 700; color: var(--accent-primary); margin-bottom: 4px;">${route.name}</h3>
                        <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${route.description}</p>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span class="route-badge" style="background: rgba(94, 170, 168, 0.15); color: var(--accent-primary); border: 1px solid rgba(94, 170, 168, 0.4);">${route.duration}</span>
                            <span class="route-badge" style="background: rgba(5, 102, 118, 0.15); color: var(--accent-primary); border: 1px solid rgba(5, 102, 118, 0.4);">${route.difficulty}</span>
                        </div>
                    </div>
                `;
            }).join('');
            
            console.log('Готовые маршруты отрендерены');
        }

        // Обработчик выбора пирса
        function handlePierSelection() {
            const pierSelect = document.getElementById('pierSelect');
            const islandListDiv = document.getElementById('islandList');
            if (!pierSelect || !islandListDiv) return;

            const pier = pierSelect.value;
            console.log('Выбран пирс:', pier);
            
            clearMapAndInfo();
            islandListDiv.innerHTML = '';

            if (!pier) {
                islandListDiv.innerHTML = '<p style="font-size: 14px; color: var(--text-secondary);">Сначала выберите пирс</p>';
                applyFilters();
                return;
            }

            // Находим острова для выбранного пирса
            const islandsForPier = [...new Set(ROUTES_DATA
                .filter(r => {
                    const routePier = r['Пирс отправления'];
                    return isSimilarPier(routePier, pier);
                })
                .map(r => r['Остров назначения']))]
                .sort();

            console.log('Найдено островов для пирса', pier, ':', islandsForPier);

            if (islandsForPier.length === 0) {
                islandListDiv.innerHTML = '<p style="font-size: 14px; color: var(--text-secondary);">Для этого пирса нет доступных островов</p>';
            } else {
                islandsForPier.forEach(island => {
                    const label = document.createElement('label');
                    label.style.cssText = "display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;";
                    label.innerHTML = `
                        <input type="checkbox" value="${island}" style="width: 16px; height: 16px; border-radius: 4px; border: 2px solid rgba(0,0,0,0.2); cursor: pointer; background: rgba(233, 236, 239, 0.8);">
                        <span style="font-size: 14px; font-weight: 600; color: var(--text-secondary);">${island}</span>
                    `;

                    label.addEventListener('mouseenter', function() {
                        this.style.background = 'rgba(94, 170, 168, 0.15)';
                    });

                    label.addEventListener('mouseleave', function() {
                        this.style.background = 'transparent';
                    });

                    islandListDiv.appendChild(label);
                });
            }

            // Применяем фильтры после выбора пирса
            applyFilters();
        }

        // Очистка маршрута
        function clearRoute() {
            const pierSelect = document.getElementById('pierSelect');
            const vesselSelect = document.getElementById('vesselSelect');
            if (!pierSelect || !vesselSelect) return;

            pierSelect.value = '';
            vesselSelect.value = '';

            const islandCheckboxes = document.querySelectorAll('#islandList input[type="checkbox"]');
            islandCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });

            // Сброс фильтра сезонов
            const seasonButtons = document.querySelectorAll('.season-filter-btn');
            seasonButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('.season-filter-btn.all').classList.add('active');
            currentSeasonFilter = 'all';

            clearMapAndInfo();
            applyFilters();
        }

        // Расчет маршрута
        function handleRouteCalculation() {
            const pierSelect = document.getElementById('pierSelect');
            const vesselSelect = document.getElementById('vesselSelect');
            if (!pierSelect || !vesselSelect) return;

            const pierName = pierSelect.value;
            const selectedCheckboxes = document.querySelectorAll('#islandList input:checked');
            const vesselType = vesselSelect.value;

            if (!pierName) {
                alert('Пожалуйста, выберите пирс отправления.');
                return;
            }

            if (selectedCheckboxes.length === 0) {
                alert('Пожалуйста, выберите хотя бы один остров.');
                return;
            }

            const islandNames = Array.from(selectedCheckboxes).map(cb => cb.value);
            clearMapAndInfo();

            if (map) {
                drawAndCalculateCustomRoute(pierName, islandNames, vesselType);
            }

            // Фильтрация лодок по маршруту
            const routeFilteredBoats = allBoats.filter(boat => {
                if (!boat) return false;

                const boatPier = boat.Pier || boat['Пирс отправления'] || '';
                const boatRoutes = (boat.Маршрут || '').toString().split(/[,;]/).map(r => r.trim()).filter(r => r);

                // Проверка пирса
                const pierMatches = isSimilar(boatPier, pierName);
                if (!pierMatches) return false;

                // Проверка островов в маршруте
                const islandMatches = islandNames.some(island =>
                    boatRoutes.some(boatRoute => isSimilar(boatRoute, island))
                );
                if (!islandMatches) return false;

                // Проверка типа судна
                if (vesselType && vesselType !== '') {
                    const boatType = getBoatTypeKey(boat.Тип);
                    if (boatType !== vesselType) return false;
                }

                return true;
            });

            currentBoats = routeFilteredBoats;
            displayBoats(currentBoats);
            updateBoatsCount(currentBoats.length);
        }

       // Улучшенная отрисовка маршрута на карте с нумерацией
function drawAndCalculateCustomRoute(pierName, islandNames, vesselType) {
    if (!map) return;

    const vesselSpeed = VESSEL_SPEEDS[vesselType] || 20;
    const bounds = new google.maps.LatLngBounds();
    const pierData = ROUTES_DATA.find(r => r['Пирс отправления'] === pierName);

    if (!pierData) return;

    // Начальная точка - пирс
    let routePoints = [{
        name: pierName,
        lat: pierData['Координаты пирса (широта)'],
        lng: pierData['Координаты пирса (долгота)'],
        isPier: true
    }];

    // Точки островов
    let totalDistance = 0;
    let segments = [];

    // Проход по всем выбранным островам
    for (let i = 0; i < islandNames.length; i++) {
        const islandName = islandNames[i];
        const islandData = ROUTES_DATA.find(r =>
            r['Остров назначения'] === islandName &&
            r['Пирс отправления'] === pierName
        );

        if (islandData) {
            const point = {
                name: islandName,
                lat: islandData['Координаты острова (широта)'],
                lng: islandData['Координаты острова (долгота)'],
                distance: islandData['Расстояние (км)'],
                isPier: false
            };

            routePoints.push(point);

            // Расчет времени от предыдущей точки до текущей
            const prevPoint = routePoints[routePoints.length - 2];
            const distance = i === 0 ?
                islandData['Расстояние (км)'] :
                calculateDistance(
                    prevPoint.lat, prevPoint.lng,
                    point.lat, point.lng
                );

            const timeMinutes = Math.round((distance / vesselSpeed) * 60);
            segments.push({
                from: prevPoint.name,
                to: point.name,
                distance: distance,
                time: timeMinutes
            });

            totalDistance += distance;
        }
    }

    // Обратный путь: от последнего острова до пирса
    if (routePoints.length > 1) {
        const lastIsland = routePoints[routePoints.length - 1];
        const returnRoute = ROUTES_DATA.find(r =>
            r['Остров назначения'] === lastIsland.name &&
            r['Пирс отправления'] === pierName
        );

        if (returnRoute) {
            // Добавляем точку пирса для обратного пути
            routePoints.push({
                name: pierName,
                lat: pierData['Координаты пирса (широта)'],
                lng: pierData['Координаты пирса (долгота)'],
                isPier: true
            });

            const returnDistance = calculateDistance(
                lastIsland.lat, lastIsland.lng,
                pierData['Координаты пирса (широта)'], pierData['Координаты пирса (долгота)']
            );

            const returnTime = Math.round((returnDistance / vesselSpeed) * 60);

            segments.push({
                from: lastIsland.name,
                to: pierName,
                distance: returnDistance,
                time: returnTime
            });

            totalDistance += returnDistance;
        }
    }

    // Очищаем старые маркеры и линии
    clearMarkers();
    if (polyline) {
        polyline.setMap(null);
        polyline = null;
    }

    // Рисуем маркеры с нумерацией (исключая последнюю точку возврата)
    routePoints.forEach((point, index) => {
        // Пропускаем маркер для последней точки (возврат в пирс)
        if (index === routePoints.length - 1) {
            return;
        }
        
        
        const position = { lat: point.lat, lng: point.lng };

        // Создаем кастомную иконку с номером
        const markerIcon = {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="${point.isPier ? 'var(--accent-primary)' : 'var(--accent-secondary)'}" stroke="white" stroke-width="2"/>
                    <text x="16" y="20" text-anchor="middle" fill="white" font-weight="bold" font-size="14">${index + 1}</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 16)
        };

        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: `${index + 1}. ${point.name}`,
            icon: markerIcon,
            zIndex: 100
        });

        markers.push(marker);
        bounds.extend(position);
    });
    

            // Рисуем маршрут с пунктирными линиями
const pathCoordinates = routePoints.map(p => ({ lat: p.lat, lng: p.lng }));

polyline = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: true,
    strokeColor: '#e6be8a', // Ярко-желтый цвет
    strokeOpacity: 0.9,     // Увеличил прозрачность для лучшей видимости
    strokeWeight: 2,        // Тонкая линия
    strokeDashArray: [5, 15], // Пунктир: 5px линия, 15px пробел
    zIndex: 50
});


polyline.setMap(map);

    // Устанавливаем границы карты
    map.fitBounds(bounds);
    
    // Добавляем небольшой отступ
    const padding = 50;
    map.panToBounds(bounds, padding);

   

            // Обновляем информацию о маршруте
            const totalTimeMinutes = Math.round((totalDistance / vesselSpeed) * 60);
            const hours = Math.floor(totalTimeMinutes / 60);
            const minutes = totalTimeMinutes % 60;

            fullRouteInfo = {
                pierName,
                islandNames,
                totalDistance,
                totalTime: totalTimeMinutes,
                segments,
                vesselSpeed,
                vesselType,
                weather: getRandomWeather(),
                routePoints: routePoints // Сохраняем точки маршрута для статичной карты
            };

            // Обновляем UI
            const compactTotalDistance = document.getElementById('compactTotalDistance');
            const compactTotalTime = document.getElementById('compactTotalTime');
            const compactVesselType = document.getElementById('compactVesselType');
            const compactIslandsCount = document.getElementById('compactIslandsCount');
            const routeSegmentsCompact = document.getElementById('routeSegmentsCompact');
            const routeInfoCompact = document.getElementById('routeInfoCompact');

            if (compactTotalDistance) compactTotalDistance.textContent = `${totalDistance.toFixed(1)} км`;
            if (compactTotalTime) compactTotalTime.textContent = `${hours}ч ${minutes}мин`;
            if (compactVesselType) compactVesselType.textContent = `${vesselSpeed} уз`;
            if (compactIslandsCount) compactIslandsCount.textContent = islandNames.length;

            if (routeSegmentsCompact) {
                routeSegmentsCompact.innerHTML = segments.map((seg, idx) => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                        <div style="flex: 1;">
                            <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">${idx + 1}. ${seg.from} → ${seg.to}</div>
                            <div style="font-size: 12px; color: var(--text-secondary);">${seg.distance.toFixed(1)} км</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 12px; font-weight: 600; color: var(--accent-primary);">${Math.floor(seg.time / 60)}ч ${seg.time % 60}мин</div>
                        </div>
                    </div>
                `).join('');
            }

             // Обновляем погоду
            const compactWeatherIcon = document.getElementById('compactWeatherIcon');
            const compactWeatherCondition = document.getElementById('compactWeatherCondition');
            const compactWeatherTemp = document.getElementById('compactWeatherTemp');
            const compactWeatherWind = document.getElementById('compactWeatherWind');
            const compactWeatherWaves = document.getElementById('compactWeatherWaves');

            if (compactWeatherIcon) compactWeatherIcon.textContent = fullRouteInfo.weather.icon;
            if (compactWeatherCondition) compactWeatherCondition.textContent = fullRouteInfo.weather.condition;
            if (compactWeatherTemp) compactWeatherTemp.textContent = `${fullRouteInfo.weather.temp}°C`;
            if (compactWeatherWind) compactWeatherWind.textContent = `${fullRouteInfo.weather.wind} м/с`;
            if (compactWeatherWaves) compactWeatherWaves.textContent = `${fullRouteInfo.weather.waves} м`;

            if (routeInfoCompact) routeInfoCompact.classList.remove('hidden');

            if (routePoints.length > 0) {
                map.fitBounds(bounds);
            }
        }

        // Очистка маркеров
        function clearMarkers() {
            markers.forEach(marker => {
                if (marker && marker.setMap) {
                    marker.setMap(null);
                }
            });
            markers = [];
        }

        // Расчет расстояния между двумя точками (в км)
        function calculateDistance(lat1, lng1, lat2, lng2) {
            const R = 6371; // Радиус Земли в км
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLng = (lng2 - lng1) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        }

        // Очистка карты и информации
        function clearMapAndInfo() {
            clearMarkers();
            if (polyline) {
                polyline.setMap(null);
                polyline = null;
            }
            fullRouteInfo = null;

            const routeInfoCompact = document.getElementById('routeInfoCompact');
            if (routeInfoCompact) {
                routeInfoCompact.classList.add('hidden');
            }
        }

        // Получение случайной погоды
        function getRandomWeather() {
            return WEATHER_OPTIONS[Math.floor(Math.random() * WEATHER_OPTIONS.length)];
        }

        // Захватываем карту как изображение
        async function captureMapAsImage() {
            if (!map) {
                console.error('Карта не инициализирована');
                return generateSvgMap(fullRouteInfo ? fullRouteInfo.routePoints : null);
            }

            const mapContainer = document.getElementById('map-container');
            if (!mapContainer) return generateSvgMap(fullRouteInfo ? fullRouteInfo.routePoints : null);

            try {
                // Ждем полной загрузки карты и отрисовки маршрута
                await new Promise(resolve => setTimeout(resolve, 2000));

                const canvas = await html2canvas(mapContainer, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    allowTaint: false,
                    backgroundColor: '#f8f9fa',
                    quality: 0.9,
                    imageTimeout: 15000
                });

                return canvas.toDataURL('image/png', 0.9);
            } catch (error) {
                console.error('Ошибка при захвате карты:', error);
                
                // Используем SVG карту как запасной вариант
                return generateSvgMap(fullRouteInfo ? fullRouteInfo.routePoints : null);
            }
        }
        
        // Альтернативная функция для создания SVG карты с маршрутом
        function generateSvgMap(routePoints) {
            if (!routePoints || routePoints.length < 2) {
                return 'https://via.placeholder.com/800x400/f8f9fa/056676?text=Карта+маршрута';
            }

            try {
                // Находим границы маршрута для масштабирования
                const lats = routePoints.map(p => p.lat);
                const lngs = routePoints.map(p => p.lng);
                
                const minLat = Math.min(...lats);
                const maxLat = Math.max(...lats);
                const minLng = Math.min(...lngs);
                const maxLng = Math.max(...lngs);
                
                const latRange = maxLat - minLat;
                const lngRange = maxLng - minLng;
                
                // Добавляем отступы
                const padding = 0.1;
                const bounds = {
                    minLat: minLat - latRange * padding,
                    maxLat: maxLat + latRange * padding,
                    minLng: minLng - lngRange * padding,
                    maxLng: maxLng + lngRange * padding
                };
                
                // Функция для преобразования координат в SVG координаты
                const scaleX = (lng) => ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 700;
                const scaleY = (lat) => 400 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 400;
                
                // Создаем SVG
                let svg = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg" style="background:#f8f9fa;">`;
                
                // Рисуем линии маршрута
                svg += `<polyline points="`;
                routePoints.forEach((point, index) => {
                    const x = scaleX(point.lng);
                    const y = scaleY(point.lat);
                    svg += `${x},${y} `;
                });
                svg += `" fill="none" stroke="var(--accent-secondary)" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`;
                
                // Рисуем точки маршрута с номерами
                routePoints.forEach((point, index) => {
                    const x = scaleX(point.lng);
                    const y = scaleY(point.lat);
                    const color = point.isPier ? 'var(--accent-primary)' : 'var(--accent-secondary)';
                    const radius = point.isPier ? 12 : 10;
                    
                    // Круг
                    svg += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" stroke="white" stroke-width="2"/>`;
                    
                    // Номер
                    svg += `<text x="${x}" y="${y + 4}" text-anchor="middle" fill="white" font-weight="bold" font-size="12">${index + 1}</text>`;
                });
                
                svg += `</svg>`;
                
                // Конвертируем SVG в data URL
                return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
                
            } catch (error) {
                console.error('Ошибка создания SVG карты:', error);
                return 'https://via.placeholder.com/800x400/f8f9fa/056676?text=Карта+маршрута';
            }
        }        
        
        // Улучшенная функция для генерации URL статичной карты с линиями маршрута
        function generateStaticMapUrl(routePoints) {
            if (!routePoints || routePoints.length < 2) {
                return 'https://via.placeholder.com/800x400/f8f9fa/056676?text=Карта+маршрута';
            }

            const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
            const size = '800x400';
            const mapType = 'terrain';
            const apiKey = GOOGLE_MAPS_API_KEY;

            try {
                // Создаем маркеры для всех точек
                let markers = '';
                routePoints.forEach((point, index) => {
                    const color = point.isPier ? 'red' : 'blue';
                    const label = (index + 1).toString();
                    markers += `&markers=color:${color}%7Clabel:${label}%7C${point.lat},${point.lng}`;
                });

                // Создаем путь для линии маршрута - исправленная версия
                let path = `path=color:0x5eaaa8FF|weight:6`;
                routePoints.forEach(point => {
                    path += `|${point.lat},${point.lng}`;
                });

                // Определяем центр карты и зум
                const center = routePoints[0]; // Первая точка как центр
                const zoom = 10;

                const url = `${baseUrl}?size=${size}&maptype=${mapType}&${path}${markers}&center=${center.lat},${center.lng}&zoom=${zoom}&key=${apiKey}`;
                
                console.log('Generated static map URL:', url);
                return url;
                
            } catch (error) {
                console.error('Ошибка создания статичной карты:', error);
                return 'https://via.placeholder.com/800x400/f8f9fa/056676?text=Карта+маршрута';
            }
        }

        // Генерация презентации - исправленная версия
        async function generatePresentation() {
            if (favoriteBoats.size === 0) {
                alert('Выберите хотя бы одну лодку для создания презентации.');
                return;
            }

            // Показываем индикатор загрузки
            const pdfPreview = document.getElementById('pdfPreview');
            pdfPreview.innerHTML = '<div style="text-align: center; padding: 50px; color: var(--text-secondary);">Подготовка презентации...</div>';

            let mapImage = null;

            if (fullRouteInfo && fullRouteInfo.routePoints && fullRouteInfo.routePoints.length > 1) {
                try {
                    console.log('Создаем карту маршрута...');
                    mapImage = await captureMapAsImage();
                    console.log('Карта успешно создана');
                } catch (error) {
                    console.error('Ошибка при создании карты:', error);
                    // Создаем простую SVG карту как последний вариант
                    mapImage = generateSvgMap(fullRouteInfo.routePoints);
                }
            }
            
            const favoriteBoatsData = Array.from(favoriteBoats).map(boatId =>
                allBoats.find(boat => boat.uniqueId === boatId)
            ).filter(boat => boat !== undefined);

            // Определяем layout в зависимости от количества лодок
            const isSingleBoat = favoriteBoatsData.length === 1;
            const boatLayoutClass = isSingleBoat ? 'single-boat-layout' : '';
            const boatGridStyle = isSingleBoat ? 
                '' : 
                'display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px;';

            // Обработка текста "Включено" для каждой лодки в презентации
            favoriteBoatsData.forEach(boat => {
                boat.cleanedIncludedText = cleanIncludedText(boat['Включено'] || '');
            });

            // Создаем презентацию с высоким качеством
            const presentationContent = `
                <div class="presentation-container ${boatLayoutClass}" style="max-width: 1200px; margin: 0 auto; padding: 32px; background: #f8f9fa; font-family: 'Montserrat', sans-serif; color: var(--accent-primary);">
                    <!-- Hero Section -->
                    <div style="background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 50%, var(--accent-tertiary) 100%); color: white; padding: 32px; border-radius: 16px; margin-bottom: 24px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                            <div style="flex: 1;">
                                <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 8px; color: white;">OnlySea</h1>
                                <p style="font-size: 18px; font-weight: 300; opacity: 0.9; margin: 0; color: white;">Эксклюзивное предложение по аренде яхт</p>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 14px; opacity: 0.8;">${new Date().toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}</div>
                                <div style="font-size: 24px; font-weight: 700; margin-top: 8px;">${favoriteBoatsData.length} ${favoriteBoatsData.length === 1 ? 'Яхта' : 'Яхты'}</div>
                            </div>
                        </div>

                       ${fullRouteInfo ? `
    <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); border-radius: 12px; padding: 16px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
        <div style="text-align: center;">
            <div style="font-size: 20px; font-weight: 700;">${fullRouteInfo.totalDistance.toFixed(1)} км</div>
            <div style="font-size: 14px; opacity: 0.8;">Общее расстояние</div>
        </div>
        <div style="text-align: center;">
            <div style="font-size: 20px; font-weight: 700;">${Math.floor(fullRouteInfo.totalTime / 60)}ч ${fullRouteInfo.totalTime % 60}м</div>
            <div style="font-size: 14px; opacity: 0.8;">Время в пути</div>
        </div>
        <div style="text-align: center;">
            <div style="font-size: 20px; font-weight: 700;">${fullRouteInfo.islandNames.length}</div>
            <div style="font-size: 14px; opacity: 0.8;">${fullRouteInfo.islandNames.length === 1 ? 'Остров' : 'Острова'}</div>
        </div>
    </div>
` : ''}                       
 <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                            ${fullRouteInfo ? fullRouteInfo.segments.map((seg, idx) => `
                            <div style="background: rgba(255,255,255,0.15); padding: 12px; border-radius: 8px; display: flex; flex-direction: column;">
                                <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">${idx + 1}. ${seg.from} → ${seg.to}</div>
                                <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px;">${seg.distance.toFixed(1)} км | ${Math.floor(seg.time / 60)}ч ${seg.time % 60}мин</div>
                            </div>
                            `).join('') : ''}
                        </div>
                        
                    </div>

                    ${mapImage ? `
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 24px; border: 1px solid rgba(0,0,0,0.08);">
                        <h2 style="font-size: 20px; font-weight: 700; color: var(--accent-primary); margin-bottom: 16px;">Карта маршрута</h2>
                        <img src="${mapImage}" style="width: 100%; border-radius: 12px; max-height: 400px; object-fit: contain; background: #f8f9fa;">
                    </div>
                    ` : ''}

                    ${fullRouteInfo ? `
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 24px; border: 1px solid rgba(0,0,0,0.08);">
                        <h2 style="font-size: 20px; font-weight: 700; color: var(--accent-primary); margin-bottom: 16px;">Погода и условия</h2>
                        <div class="weather-compact">
                         
<div class="weather-compact-item">
    <div class="weather-compact-icon">${getWeatherIcon('temperature')}</div>
    <div class="weather-compact-label">Температура</div>
    <div class="weather-compact-value">${fullRouteInfo.weather.temp}°C</div>
</div>
<div class="weather-compact-item">
    <div class="weather-compact-icon">${getWeatherIcon('wind')}</div>
    <div class="weather-compact-label">Ветер</div>
    <div class="weather-compact-value">${fullRouteInfo.weather.wind} м/с</div>
</div>
<div class="weather-compact-item">
    <div class="weather-compact-icon">${getWeatherIcon('waves')}</div>
    <div class="weather-compact-label">Волны</div>
    <div class="weather-compact-value">${fullRouteInfo.weather.waves} м</div>
</div>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Лодки -->
                    <div style="${boatGridStyle}">
                        ${favoriteBoatsData.map(boat => `
                        <div class="presentation-boat ${isSingleBoat ? 'single-boat-layout' : ''}">
                            <img src="${boat['Главное фото'] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'}"
                                 alt="${boat['Boat Name'] || 'Лодка'}"
                                 class="presentation-boat-photo ${isSingleBoat ? 'single-boat-layout' : ''}"
                                 onerror="this.src='https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'">

                            <div style="padding: 20px;">
                                <h3 style="font-size: 20px; font-weight: 700; color: var(--accent-primary); margin-bottom: 16px; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 8px;">${boat['Boat Name'] || 'Неизвестная лодка'}</h3>

                                <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px; font-size: 14px; margin-bottom: 16px;">
                                    <span style="color: var(--text-secondary); font-weight: 500;">Тип:</span>
                                    <span style="color: var(--text-primary); font-weight: 600;">${getBoatTypeName(boat.Тип)}</span>

                                    <span style="color: var(--text-secondary); font-weight: 500;">Длина:</span>
                                    <span style="color: var(--text-primary); font-weight: 600;">${boat.Длина || '—'}</span>

                                    <span style="color: var(--text-secondary); font-weight: 500;">Вместимость:</span>
                                    <span style="color: var(--text-primary); font-weight: 600;">${boat['Макс. чел'] || '—'} чел.</span>

                                    <span style="color: var(--text-secondary); font-weight: 500;">Длительность:</span>
                                    <span style="color: var(--text-primary); font-weight: 600;">${boat.Длительность || '—'}</span>

                                    <span style="color: var(--text-secondary); font-weight: 500;">Маршрут:</span>
                                    <span style="color: var(--text-primary); font-weight: 600;">${boat.Маршрут || 'Не указан'}</span>

                                    <span style="color: var(--text-secondary); font-weight: 500;">Пирс:</span>
                                    <span style="color: var(--text-primary); font-weight: 600;">${boat.Pier || boat['Пирс отправления'] || 'Не указан'}</span>

                                    <span style="color: var(--text-secondary); font-weight: 500;">Сезон:</span>
                                    <span style="color: var(--text-primary); font-weight: 600;">${getSeasonBadge(boat).replace(/<[^>]*>/g, '')}</span>

                                    <span style="color: var(--text-secondary); font-weight: 500; padding-top: 8px; border-top: 1px solid rgba(0,0,0,0.1);">Цена:</span>
                                    <span style="color: var(--accent-primary); font-weight: 700; font-size: 18px; padding-top: 8px; border-top: 1px solid rgba(0,0,0,0.1);">${boat.Цена || 0} ${boat.Currency || 'THB'}</span>
                                </div>

                                ${boat.cleanedIncludedText && boat.cleanedIncludedText.length > 0 ? `
                                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.1);">
                                    <h4 style="font-size: 14px; font-weight: 600; color: #28a745; margin-bottom: 8px;">Включено в стоимость:</h4>
                                    <ul style="list-style: none; padding: 0; margin: 0;">
                                        ${boat.cleanedIncludedText.map(function(item) {
                                            return '<li style="padding: 6px 0; color: var(--text-primary); font-size: 14px; line-height: 1.4; display: flex; align-items: flex-start; gap: 8px; border-bottom: 1px solid rgba(0,0,0,0.05);"><span style="color: #28a745; font-weight: bold; flex-shrink: 0; margin-top: 1px;">✓</span><span>' + item + '</span></li>';
                                        }).join('')}
                                    </ul>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        `).join('')}
                    </div>


                  <!-- Заключение -->
<div style="background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%); color: white; padding: 24px; border-radius: 16px; text-align: center; margin-top: 24px;">
    <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px; color: white !important;">Благодарим за выбор OnlySea !</h2>
    <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; opacity: 0.9; color: white !important;">
        Мы рады предложить вам эксклюзивное путешествие на лучших яхтах Таиланда.
    </p>
    <div style="text-align: right;">
        <div style="font-size: 12px; opacity: 0.8; margin-bottom: 4px; color: white !important;">Контакты</div>
        <div style="font-weight: 600; font-size: 16px; color: white !important;">OnlySea</div>
        <div style="font-size: 14px; opacity: 0.9; color: white !important;">+66 9 2258 5577</div>
    </div>
</div>

                    <!-- Footer -->
                    <div style="margin-top: 20px; text-align: center; font-size: 12px; color: var(--text-secondary);">
                        <p>Презентация создана ${new Date().toLocaleDateString('ru-RU')} в ${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p style="margin-top: 4px;">© OnlySea - Система подбора лодок</p>
                    </div>
                </div>
            `;

            if (pdfPreview) {
                pdfPreview.innerHTML = presentationContent;
            }

            const pdfModal = document.getElementById('pdfModal');
            if (pdfModal) {
                pdfModal.style.display = 'flex';
            }
        }


        // Улучшенное скачивание PNG с качеством 6
        async function downloadPresentationAsPNG() {
            const element = document.getElementById('pdfPreview');
            if (!element) return;

            try {
                const canvas = await html2canvas(element, {
                    scale: 6, // Повышаем качество до 6
                    useCORS: true,
                    logging: false,
                    allowTaint: false,
                    backgroundColor: '#f8f9fa',
                    quality: 1.0,
                    width: element.scrollWidth,
                    height: element.scrollHeight
                });

                const link = document.createElement('a');
                link.download = `OnlySea_VIP_Presentation_${new Date().toISOString().split('T')[0]}.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                link.click();
            } catch (error) {
                console.error('Ошибка при создании PNG:', error);
                alert('Ошибка при создании PNG. Попробуйте еще раз.');
            }
        }

        // Скачать TXT с ссылкой на папку Google Drive
        function downloadTxtFile() {
            if (favoriteBoats.size === 0) {
                alert('Нет выбранных лодок для экспорта.');
                return;
            }

            const favoriteBoatsData = Array.from(favoriteBoats).map(boatId =>
                allBoats.find(boat => boat.uniqueId === boatId)
            ).filter(boat => boat !== undefined);

            let txtContent = `
           OnlySea VIP - Презентация яхт
═══════════════════════════════════════════════════════════════
Дата: ${new Date().toLocaleDateString('ru-RU')}
Время: ${new Date().toLocaleTimeString('ru-RU')}

`;

            if (fullRouteInfo) {
                txtContent += `───────────────────────────────────────────────────────────────
ИНФОРМАЦИЯ О МАРШРУТЕ
───────────────────────────────────────────────────────────────
Пирс отправления: ${fullRouteInfo.pierName}
Острова: ${fullRouteInfo.islandNames.join(', ')}
Общее расстояние: ${fullRouteInfo.totalDistance.toFixed(1)} км
Время в пути: ${Math.floor(fullRouteInfo.totalTime / 60)}ч ${fullRouteInfo.totalTime % 60}мин
Тип судна: ${getBoatTypeName(fullRouteInfo.vesselType)} (${fullRouteInfo.vesselSpeed} узлов)
Погода: ${fullRouteInfo.weather.condition}, ${fullRouteInfo.weather.temp}°C, ветер ${fullRouteInfo.weather.wind} м/с, волны ${fullRouteInfo.weather.waves} м

Сегменты маршрута:
`;
                fullRouteInfo.segments.forEach((seg, idx) => {
                    txtContent += `  ${idx + 1}. ${seg.from} → ${seg.to}
     Расстояние: ${seg.distance.toFixed(1)} км, Время: ${Math.floor(seg.time / 60)}ч ${seg.time % 60}мин
`;
                });
                txtContent += `\n`;
            }

            txtContent += `───────────────────────────────────────────────────────────────
ВЫБРАННЫЕ ЯХТЫ (${favoriteBoatsData.length})
───────────────────────────────────────────────────────────────
`;
            favoriteBoatsData.forEach((boat, index) => {
                txtContent += `${index + 1}. ${boat['Boat Name'] || 'Неизвестная лодка'}
   Тип: ${getBoatTypeName(boat.Тип) || 'Не указан'}
   Длина: ${boat.Длина || '—'}
   Вместимость: ${boat['Макс. чел'] || '—'} чел.
   Длительность: ${boat.Длительность || '—'}
   Маршрут: ${boat.Маршрут || 'Не указан'}
   Пирс: ${boat.Pier || boat['Пирс отправления'] || 'Не указан'}
   Сезон: ${getSeasonBadge(boat).replace(/<[^>]*>/g, '')}
   Цена: ${boat.Цена || 0} ${boat.Currency || 'THB'}
`;
                if (boat.Включено) {
                    txtContent += `   Включено: ${boat.Включено.toString().replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')}
`;
                }
                txtContent += `\n`;
            });

            const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `OnlySea_VIP_Presentation_${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        // Выбрать все лодки
        function selectAllBoats() {
            if (!Array.isArray(currentBoats)) return;

            currentBoats.forEach(boat => {
                if (boat && boat.uniqueId !== undefined) {
                    favoriteBoats.add(boat.uniqueId);
                }
            });
            displayBoats(currentBoats);
            updateFavoriteCount();
        }

        // Очистить избранное
        function clearAllBoats() {
            favoriteBoats.clear();
            displayBoats(currentBoats);
            updateFavoriteCount();
        }

        // Применение готового маршрута (исправленная версия)
        function applyPresetRoute(routeId) {
            const route = PRESET_ROUTES[routeId];
            if (!route) {
                console.error('Маршрут не найден:', routeId);
                return;
            }

            console.log('Применяем маршрут:', route.name);
            console.log('Пирс из пресета:', route.pier);
            console.log('Острова из пресета:', route.islands);

            const pierSelect = document.getElementById('pierSelect');
            if (!pierSelect) return;

            // Ищем точное совпадение пирса
            let foundPier = null;
            for (let i = 0; i < pierSelect.options.length; i++) {
                const option = pierSelect.options[i];
                if (option.value === route.pier) {
                    foundPier = option.value;
                    break;
                }
            }

            if (!foundPier) {
                console.log('Точное совпадение не найдено, ищем частичное...');
                // Ищем частичное совпадение
                for (let i = 0; i < pierSelect.options.length; i++) {
                    const option = pierSelect.options[i];
                    if (option.value && option.value.includes(route.pier) || route.pier.includes(option.value)) {
                        foundPier = option.value;
                        console.log('Найдено частичное совпадение:', foundPier);
                        break;
                    }
                }
            }

            if (!foundPier) {
                console.error('Пирс не найден в списке:', route.pier);
                alert(`Пирс "${route.pier}" не найден в списке доступных пирсов`);
                return;
            }

            console.log('Устанавливаем пирс:', foundPier);
            pierSelect.value = foundPier;
            
            // Вызываем обработчик выбора пирса
            handlePierSelection();

            // Даем время на загрузку списка островов
            setTimeout(() => {
                const islandListDiv = document.getElementById('islandList');
                if (!islandListDiv) {
                    console.error('Контейнер списка островов не найден');
                    return;
                }

                // Получаем все доступные острова для этого пирса из ROUTES_DATA
                const availableIslands = ROUTES_DATA
                    .filter(r => r['Пирс отправления'] === foundPier)
                    .map(r => r['Остров назначения']);

                console.log('Доступные острова для пирса', foundPier, ':', availableIslands);

                if (availableIslands.length === 0) {
                    console.error('Нет доступных островов для пирса:', foundPier);
                    alert(`Для пирса "${foundPier}" нет доступных островов в данных`);
                    return;
                }

                // Находим соответствия между островами пресета и доступными островами
                const islandsToSelect = [];
                
                route.islands.forEach(presetIsland => {
                    // Ищем точное совпадение
                    let matchingIsland = availableIslands.find(availableIsland => 
                        availableIsland === presetIsland
                    );
                    
                    // Если точного совпадения нет, ищем частичное
                    if (!matchingIsland) {
                        matchingIsland = availableIslands.find(availableIsland => 
                            availableIsland.toLowerCase().includes(presetIsland.toLowerCase()) ||
                            presetIsland.toLowerCase().includes(availableIsland.toLowerCase())
                        );
                    }
                    
                    if (matchingIsland) {
                        islandsToSelect.push(matchingIsland);
                        console.log('Найдено соответствие:', presetIsland, '->', matchingIsland);
                    } else {
                        console.log('Не найдено соответствие для:', presetIsland);
                    }
                });

                // Если не нашли точных соответствий, берем первые доступные острова
                if (islandsToSelect.length === 0) {
                    console.log('Точных соответствий не найдено, берем первые доступные острова');
                    const islandsToTake = Math.min(2, availableIslands.length);
                    for (let i = 0; i < islandsToTake; i++) {
                        islandsToSelect.push(availableIslands[i]);
                    }
                }

                console.log('Острова для выбора:', islandsToSelect);

                // Отмечаем чекбоксы
                islandsToSelect.forEach(island => {
                    const checkbox = document.querySelector(`#islandList input[value="${island}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        console.log('Отмечен чекбокс для:', island);
                    } else {
                        console.warn('Чекбокс не найден для острова:', island);
                        // Показываем какие чекбоксы вообще есть
                        const allCheckboxes = document.querySelectorAll('#islandList input[type="checkbox"]');
                        console.log('Доступные чекбоксы:', Array.from(allCheckboxes).map(cb => cb.value));
                    }
                });

                // Строим маршрут
                if (islandsToSelect.length > 0) {
                    console.log('Строим маршрут с островами:', islandsToSelect);
                    setTimeout(() => {
                        handleRouteCalculation();
                    }, 300);
                } else {
                    console.error('Не удалось найти острова для маршрута');
                    alert('Не удалось найти подходящие острова для выбранного маршрута');
                }
            }, 800); // Увеличиваем задержку для полной загрузки списка
        }

        // Вспомогательная функция сравнения строк
        function isSimilar(str1, str2) {
            if (!str1 || !str2) return false;

            const normalize = s => s.toString().toLowerCase().trim()
                .replace(/[,\s]+/g, ' ')
                .replace(/ё/gi, 'е')
                .replace(/[^a-z0-9а-я ]/gi, '');

            const n1 = normalize(str1);
            const n2 = normalize(str2);

            return n1.includes(n2) || n2.includes(n1) || n1 === n2;
        }

        // Переключение темы
        function toggleTheme() {
            isDarkTheme = !isDarkTheme;
            
            if (isDarkTheme) {
                // Переключаем на темную тему
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
            } else {
                // Переключаем на светлую тему
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
            }
        }

        // Настройка обработчиков событий
        function setupEventListeners() {
            const pierSelect = document.getElementById('pierSelect');
            const calculateRouteBtn = document.getElementById('calculateRouteBtn');
            const clearRouteBtn = document.getElementById('clearRouteBtn');
            const presetRoutesContainer = document.getElementById('presetRoutesContainer');
            const boatsList = document.getElementById('boatsList');
            const selectAllBtn = document.getElementById('selectAllBtn');
            const clearAllBtn = document.getElementById('clearAllBtn');
            const generatePdfBtn = document.getElementById('generatePdfBtn');
            const closePhotoModal = document.getElementById('closePhotoModal');
            const closePdfModal = document.getElementById('closePdfModal');
            const pdfModal = document.getElementById('pdfModal');
            const downloadPngBtn = document.getElementById('downloadPngBtn');
            const downloadTxtBtn = document.getElementById('downloadTxtBtn');
            const boatSearch = document.getElementById('boatSearch');
            const themeToggle = document.getElementById('themeToggle');

            if (pierSelect) pierSelect.addEventListener('change', handlePierSelection);
            if (calculateRouteBtn) calculateRouteBtn.addEventListener('click', handleRouteCalculation);
            if (clearRouteBtn) clearRouteBtn.addEventListener('click', clearRoute);
            if (presetRoutesContainer) {
                presetRoutesContainer.addEventListener('click', function(e) {
                    const card = e.target.closest('.route-card');
                    if (card) {
                        const routeId = card.dataset.route;
                        applyPresetRoute(routeId);
                    }
                });
            }
            if (boatsList) {
                boatsList.addEventListener('click', function(event) {
                    const favoriteBtn = event.target.closest('.favorite-btn');
                    if (favoriteBtn) {
                        const card = event.target.closest('.boat-card');
                        if (card) {
                            const boatUniqueId = parseInt(card.dataset.boatUniqueId, 10);
                            if (!isNaN(boatUniqueId)) {
                                toggleFavorite(boatUniqueId);
                            }
                        }
                    }

                    const photoBtn = event.target.closest('.photo-btn');
                    if (photoBtn) {
                        event.preventDefault();
                        const card = event.target.closest('.boat-card');
                        if (card) {
                            const boatUniqueId = parseInt(card.dataset.boatUniqueId, 10);
                            if (!isNaN(boatUniqueId)) {
                                showPhotoGallery(boatUniqueId);
                            }
                        }
                    }
                });
            }
            if (selectAllBtn) selectAllBtn.addEventListener('click', selectAllBoats);
            if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllBoats);
            if (generatePdfBtn) generatePdfBtn.addEventListener('click', generatePresentation);
            if (closePhotoModal) closePhotoModal.addEventListener('click', () => {
                const photoModal = document.getElementById('photoModal');
                if (photoModal) photoModal.classList.remove('active');
            });
            if (closePdfModal) closePdfModal.addEventListener('click', () => {
                if (pdfModal) pdfModal.style.display = 'none';
            });
            if (pdfModal) {
                pdfModal.addEventListener('click', (e) => {
                    if (e.target === pdfModal) {
                        pdfModal.style.display = 'none';
                    }
                });
            }
            if (downloadPngBtn) downloadPngBtn.addEventListener('click', downloadPresentationAsPNG);
            if (downloadTxtBtn) downloadTxtBtn.addEventListener('click', downloadTxtFile);
            if (boatSearch) boatSearch.addEventListener('input', searchBoats);
            if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
        }

        // Создаем глобальный объект для доступа к функциям из HTML
        window.app = {
            toggleIncludedContent: toggleIncludedContent
        };

        // Запуск приложения
        loadGoogleMaps();
        setTimeout(() => {
            if (!mapInitialized) {
                console.log('Google Maps not loaded, initializing app without map...');
                initializeApp();
            }
        }, 5000);
   })();
    </script>
</body>
</html>


