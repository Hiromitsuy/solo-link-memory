import Express from 'express';

const PORT = process.env.PORT || 3000;

function createServer() {
  const app = Express();

  app.get('/api', (_req, res) => res.send('hello world'));
  return app;
}

const app = createServer();
app.listen(PORT, () => console.log(`open server on ${PORT}`));
