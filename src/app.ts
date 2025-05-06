import { createAxiosInstance } from '@scaleleap/selling-partner-api-sdk';

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
