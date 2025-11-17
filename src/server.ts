import Express from 'express';
import setupRouting from './routing';

const PORT = process.env.PORT || 3000;

function createServer() {
  const app = Express();

  setupRouting(app);
  return app;
}

const app = createServer();
app.listen(PORT, () => console.log(`open server on ${PORT}`));
