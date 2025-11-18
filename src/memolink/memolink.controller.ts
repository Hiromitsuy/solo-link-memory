import MemoLink from '../model/MemoLinkModel';
import MemoLinkService from './memolink.service';
import { Response, Request } from 'express';

export default class MemoLinkController {
  service: MemoLinkService;

  constructor(service: MemoLinkService) {
    this.service = service;
  }

  get = async (req: Request, res: Response) => {
    const list = await this.service.list();
    res.json(list);
  };

  getById = async (req: Request, res: Response) => {
    if (req.params.id) {
      const data = await this.service.findById(Number(req.params.id));
      return res.json(data);
    } else {
      throw new Error('Target MemoLink Id is undefined');
    }
  };

  post = async (req: Request, res: Response) => {
    const newData: MemoLink = {
      id: undefined,
      linkUri: req.body.linkUri,
      memo: req.body.memo,
    };

    const createdItem = await this.service.create(newData);
    res.status(201).json(createdItem);
  };
}
