
import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe('POST /weather', () => {
  it('should return 400 if cityName is not provided', async () => {
    const response = await request.post('/weather').send({});
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Invalid city name');
  })
  it('should return 404 if cityName is is gibberish', async () => {
    const response = await request.post('/weather').send({ cityName: 'gibberish' });
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('City not found');
  })
  it('should return current temperature if cityName is found', async () => {
    const response = await request.post('/weather').send({ cityName: 'London' });
    expect(response.statusCode).toBe(200);
    expect(response.body.weatherText).toContain('Current temperature in London: ');
    expect(response.body.weatherText).toContain('°C');
  })
})