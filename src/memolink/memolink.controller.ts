import MemoLink from '../model/MemoLinkModel';
import MemoLinkService from './memolink.service';
import { Response, Request } from 'express';

interface AuthedRequest extends Request {
  user: {
    iss: string;
    aud: string;
    auth_time: number;
    user_id: string;
    sub: string;
    iat: number;
    exp: number;
    email: string;
    email_verified: string;
  };
}

export default class MemoLinkController {
  service: MemoLinkService;

  constructor(service: MemoLinkService) {
    this.service = service;
  }

  get = async (req: Request, res: Response) => {
    const list = await this.service.list();
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

  post = async (req: AuthedRequest, res: Response) => {
    const newData: MemoLink = {
      id: 0,
      linkUri: req.body.linkUri,
      memo: req.body.memo,
      userId: req.user.user_id,
      isPublic: false,
    };

    const createdItem = await this.service.create(newData);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ data: createdItem });
  };
}
