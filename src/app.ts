import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Basic test route
app.get('/', (_req, res) => {
  res.send('✅ Amazon SP-API Proxy is running!');
});

// Placeholder for future API route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
