import MemoLink from '@/model/MemoLinkModel';
import MemoLinkRepository from './memolink.repository';

class MemoLinkService {
  private repos: MemoLinkRepository;

  constructor(repos: MemoLinkRepository) {
    this.repos = repos;
  }

  list(limit?: number) {
    return limit ? this.repos.list(limit) : this.repos.list();
  }

  findById(id: number) {
    return this.repos.find(id);
  }

  create(newMemoLink: MemoLink) {
    return this.repos.create(newMemoLink);
  }
}

export default MemoLinkService;
