const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Укажи сюда актуальный URL развертывания Google Apps Script
const FORWARD_URL = 'https://script.google.com/macros/s/AKfycbwYLyPKYLWCMyO-rsKM9HNy-XFBiwrqCeCCW_PytGdbhBGEfVway0xubp2yKkbXGNTU/exec';

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  try {
    await fetch(FORWARD_URL, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    });
    res.status(200).send('OK');
  } catch (err) {
    console.error('Ошибка прокси:', err);
    res.status(500).send('Ошибка прокси');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
