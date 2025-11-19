import Express from 'express';
import setupRouting from './routing';
import path from 'path';

const PORT = process.env.PORT || 3000;

function createServer() {
  const app = Express();
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  setupRouting(app);
  app.use('/', Express.static('./public'));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', './public', 'index.html'));
  });
  return app;
}

createServer().listen(PORT, () => console.log(`open server on ${PORT}`));
