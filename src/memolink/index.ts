import MemoLinkController from './memolink.controller';
import MemoLinkRepository from './memolink.repository';
import MemoLinkService from './memolink.service';

export default function createMemoLinkActions(knex) {
  const repository = new MemoLinkRepository(knex);
  const service = new MemoLinkService(repository);
  const controller = new MemoLinkController(service);

  return controller;
}
