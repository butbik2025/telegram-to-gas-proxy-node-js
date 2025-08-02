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
  const body = req.body;
  console.log('Incoming from Telegram:', JSON.stringify(body));

  try {
    const gasResponse = await fetch(GAS_URL + '?key=my_secure_key_123', {
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
