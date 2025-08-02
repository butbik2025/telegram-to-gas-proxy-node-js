const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const FORWARD_URL = process.env.FORWARD_URL;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  try {
    const telegramData = req.body;
    const response = await fetch(FORWARD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(telegramData),
    });
    res.status(200).send('OK');
  } catch (err) {
    console.error('Ошибка проксирования:', err);
    res.status(500).send('Error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy listening on port ${PORT}`);
});
