import keys from './src/keys.js';
import express from 'express';
import fetch from 'node-fetch'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
})

  // Define a POST route for handling weather data
app.post('/weather', async (req, res) => {

  const cityName = req.body.cityName; // value from frontend
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`;

  if (!cityName) {
   return  res.status(400).send('Invalid city name');
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '404') {
    return res.status(404).send('City not found');

    } else {
      const cityName = data.name;
      const temperature = data.main.temp;
      return res.json({ weatherText: `Current temperature in ${cityName}: ${temperature}°F` });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('Internal Server Error');
  }
});

export default app;