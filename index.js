const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const FORWARD_URL = 'https://script.google.com/macros/s/AKfycbwYLyPKYLWCMyO-rsKM9HNy-XFBiwrqCeCCW_PytGdbhBGEfVway0xubp2yKkbXGNTU/exec';

app.post('/', async (req, res) => {
  try {
    const response = await fetch(FORWARD_URL, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    });

    const responseText = await response.text();
    console.log('Forwarded to GAS. Response:', responseText);

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error forwarding to GAS:', error);
    res.status(500).send('Error');
  }
});

app.get('/ping', (req, res) => {
  console.log('Ping received');
  res.send('pong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
