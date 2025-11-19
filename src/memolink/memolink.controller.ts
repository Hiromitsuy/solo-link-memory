import { AuthRequest } from '../middleware/auth';
import MemoLink from '../model/MemoLinkModel';
import MemoLinkService from './memolink.service';
import { Response, Request } from 'express';

export default class MemoLinkController {
  service: MemoLinkService;

  constructor(service: MemoLinkService) {
    this.service = service;
  }

  get = async (req: AuthRequest, res: Response) => {
    const list = await this.service.list({
      userId: req.user.user_id,
      sortByLatest: true,
      includePublic: true,
    });
    console.log(list);
    res.setHeader('Content-Type', 'application/json');
    res.json(list);
  };

  getById = async (req: Request, res: Response) => {
    if (req.params.id) {
      const data = await this.service.findById(Number(req.params.id));
      res.setHeader('Content-Type', 'application/json');
      res.json(data);
    } else {
      throw new Error('Target MemoLink Id is undefined');
    }
  };

  post = async (req: AuthRequest, res: Response) => {
    const newData: MemoLink = {
      id: 0,
      linkUri: req.body.linkUri,
      memo: req.body.memo,
      userId: req.user.user_id,
      isPublic: false,
    };
    console.log(newData, req.user);

    const createdItem = await this.service.create(newData);
    console.log(createdItem);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ data: createdItem });
  };
}
