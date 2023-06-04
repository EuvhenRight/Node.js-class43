
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
})

  // Define a POST route for handling weather data
app.post('/weather', (req, res) => {
  // Access the cityName from the request body
  const cityName = req.body.cityName;
	
 // Check if cityName is empty or undefined
  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }
	
  // Send the cityName as a response to the client
  res.send(cityName);
});

const port = 3000;

app.listen(port, () => {
	console.log(`Server listening on port:${port}`);
});
