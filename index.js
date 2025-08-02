import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Секретный ключ и URL GAS-скрипта
const SECRET_KEY = 'AiiLPRM0zew74LY0j04gJ1965Kzchx';
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwLIcsyPG17SrBwxb1bIhZL9eYXc6ee5I0PsV-yVQx48O21Wg8zHalo8CtpUJVeDwtk0Q/exec';

app.use(express.json());

// Проверка доступности
app.get('/', (req, res) => {
  console.log('GET / — Pong');
  res.send('pong');
});

// Основной маршрут
app.post('/', async (req, res) => {
  const body = req.body;
  console.log('Incoming from Telegram:', JSON.stringify(body));

  const targetUrl = `${GAS_URL}?key=${SECRET_KEY}`;
  console.log('Sending to GAS:', targetUrl);

  try {
    const gasResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const gasText = await gasResponse.text();
    console.log('Forwarded to GAS. Response:', gasText);
    res.send('ok');
  } catch (error) {
    console.error('Error forwarding to GAS:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
