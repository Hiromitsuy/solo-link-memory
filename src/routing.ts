import express from 'express';
import createMemoLinkActions from './memolink';
import getKnex from './knex';

export default function setupRouting(app: express.Express) {
  const knex = getKnex();
  const memolink = createMemoLinkActions(knex);

  app.get('/api/memolink', memolink.get);
  app.get('/api/memolink/:id', memolink.getById);
  app.post('/api/memolink', memolink.post);

  return app;
}
