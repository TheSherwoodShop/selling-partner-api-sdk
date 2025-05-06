import express from 'express';
import axios from 'axios';
import { createAxiosInstance } from '@scaleleap/selling-partner-api-sdk';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ Your routes go here — AFTER the `app` constant is defined

app.get('/', (_req, res) => {
  res.send('✅ Amazon SP-API Proxy is running!');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/get-fee-report', async (_req, res) => {
  try {
    const client = await createAxiosInstance({
      region: 'eu',
      endpoint: 'reports',
    });

    const result = await client.post('/reports/2021-06-30/reports', {
      reportType: 'GET_FBA_ESTIMATED_FBA_FEES_ASIN',
      marketplaceIds: ['A1F83G8C2ARO7P'],
    });

    res.status(200).json({
      message: 'Fee report requested successfully',
      data: result.data,
    });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to request fee report',
      details: error.response?.data || error.message,
    });
  }
});

// Other routes (like /inventory/:asin) can go here

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
