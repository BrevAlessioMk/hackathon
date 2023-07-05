import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost',
});

export class TemperatureService {
  static async getTemperature(vehicleData) {
    try {
      const temperature = await httpClient.get('/temperature', {
        params: { ...vehicleData },
      });
      return temperature;
    } catch {
      return null;
    }
  }
}
