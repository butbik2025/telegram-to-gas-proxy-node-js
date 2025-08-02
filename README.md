```
# Telegram → Google Apps Script Proxy

Простой Node.js-прокси, пересылающий Telegram webhook-запросы в Google Apps Script.

## 🔧 Как использовать

1. Установи переменную окружения:
```

FORWARD\_URL = [https://script.google.com/macros/s/....../exec](https://script.google.com/macros/s/....../exec)

```

2. Деплой на Render / Railway / VPS:
- `npm install`
- `npm start`

3. Установи Telegram webhook:
```

[https://api.telegram.org/bot](https://api.telegram.org/bot)<токен>/setWebhook?url=https\://<твой-домен>.onrender.com

```

## 📦 Зависимости

- express
- body-parser
- node-fetch

## 📝 Пример запроса

Telegram ➡️ этот сервер ➡️ Google Apps Script

---

© 2025. Свободно для использования.
```
