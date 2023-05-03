import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
export default app;

// Enable CORS
app.use(cors());
// Parse application/json
app.use(bodyParser.json());
// Time requests
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on('finish', function () {
    const duration = process.hrtime(start);
    const durationMs = duration[0] * 1e3 + duration[1] * 1e-6;
    console.log(`${req.method} ${req.url} ${res.statusCode} - - ${durationMs.toFixed(3)} ms`);
  });
  next();
});

// Get the redirect URL to the Secureshare app
app.get('/secureshare', async (_, res) => {
  const response = await apiRequest('/secureshare', 'POST', {
    app: process.env.RECORDOP_APP_ID,
    callbackUrl: process.env.RECORDOP_CALLBACK_URL,
  });
  res.json({ url: response.data.url });
});

// Perform a FHIR query
app.post('/fhir', async (req, res) => {
  const { query, sid } = req.body;
  console.log({ query, sid });
  const response = await apiRequest(`/fhir/${query}`, 'POST', { session: sid });
  res.json(response.data.fhirData);
});

// Make a request to the RecordOp API
function apiRequest(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any) {
  return axios({
    url: new URL(path, process.env.RECORDOP_API_ENDPOINT).toString(),
    method,
    data,
    headers: {
      'x-api-key': process.env.RECORDOP_API_KEY,
      'Content-Type': 'application/json',
    },
  });
}
