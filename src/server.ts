import Express from 'express';
import setupRouting from './routing';

const PORT = process.env.PORT || 3000;

function createServer() {
  const app = Express();
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  setupRouting(app);
  return app;
}

createServer().listen(PORT, () => console.log(`open server on ${PORT}`));
