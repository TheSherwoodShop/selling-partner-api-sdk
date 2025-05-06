import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON if you need it later
app.use(express.json());

// Root route
app.get('/', (_req, res) => {
  res.send('✅ Amazon SP-API Proxy is running!');
});

// Health check route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Fee report route
app.post('/get-fee-report', async (_req, res) => {
  try {
    const response = await axios.post(
      'https://sellingpartnerapi-eu.amazon.com/reports/2021-06-30/reports',
      {
        reportType: 'GET_FBA_ESTIMATED_FBA_FEES_ASIN',
        marketplaceIds: ['A1F83G8C2ARO7P'] // UK marketplace
      }
    );

    res.status(200).json({
      message: 'Fee report requested successfully',
      data: response.data
    });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to request fee report',
      details: error.response?.data || error.message
    });
  }
});

// Inventory check route
app.get('/inventory/:asin', async (req, res) => {
  const { asin } = req.params;

  try {
    const response = await axios.get(
      'https://sellingpartnerapi-eu.amazon.com/fba/inventory/v1/summaries',
      {
        params: {
          marketplaceIds: 'A1F83G8C2ARO7P',
          asin
        }
      }
    );

    res.status(200).json({
      message: 'Inventory data retrieved',
      data: response.data
    });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to retrieve inventory',
      details: error.response?.data || error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
