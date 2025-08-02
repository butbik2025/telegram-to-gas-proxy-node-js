import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// URL веб-приложения Google Apps Script
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwLIcsyPG17SrBwxb1bIhZL9eYXc6ee5I0PsV-yVQx48O21Wg8zHalo8CtpUJVeDwtk0Q/exec';

// Мидлвар для разбора JSON
app.use(express.json());

// Проверка GET-запроса
app.get('/', (req, res) => {
  console.log('GET / — Pong');
  res.send('pong');
});

// Обработка POST-запросов от Telegram
app.post('/', async (req, res) => {
  console.log('POST / — входящий запрос от Telegram');

  try {
    const telegramBody = req.body;

    const gasResponse = await fetch(GAS_URL + '?AiiLPRM0zew74LY0j04gJ1965Kzchx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(telegramBody),
    });

    const gasText = await gasResponse.text();
    console.log('Forwarded to GAS. Response:', gasText);
    res.send('ok');
  } catch (err) {
    console.error('Ошибка при пересылке в GAS:', err);
    res.status(500).send('Ошибка на сервере прокси');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
