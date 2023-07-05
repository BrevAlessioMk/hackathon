import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:9999',
});

export class TemperatureService {
  static async getTemperature(vehicleData) {
    try {
      const temperature = await httpClient.post('/routes/orchestrator/endpoints/hackathon/predict', vehicleData);
      return temperature.data.prediction;
    } catch {
      return null;
    }
  }
}
