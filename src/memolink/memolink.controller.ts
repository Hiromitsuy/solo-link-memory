import MemoLink from '../model/MemoLinkModel';
import MemoLinkService from './memolink.service';
import { Response, Request } from 'express';

export default class MemoLinkController {
  service: MemoLinkService;

  constructor(service: MemoLinkService) {
    this.service = service;
  }

  async get(req: Request, res: Response) {
    const list = this.service.list();
    res.json(list);
  }

  async post(req: Request, res: Response) {
    const newData: MemoLink = {
      id: 0,
      linkUri: req.body.linkUri,
      memo: req.body.memo,
      created_at: Date.now().toLocaleString(),
      updated_at: Date.now().toLocaleString(),
    };

    const createdItem = await this.service.create(newData);
    res.status(201).json(createdItem);
  }
}
