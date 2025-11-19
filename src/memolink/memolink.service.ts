import MemoLink from '@/model/MemoLinkModel';
import MemoLinkRepository from './memolink.repository';
import getHeadOfLink from '@/tools/getHeadOfLink';

type ListArg = {
  userId?: string;
  includePublic?: boolean;
  sortByLatest?: boolean;
  limit?: number;
};

class MemoLinkService {
  private repos: MemoLinkRepository;

  constructor(repos: MemoLinkRepository) {
    this.repos = repos;
  }

  async list({ limit }: ListArg) {
    return await this.repos.list({ limit });
  }

  async findById(id: number) {
    return await this.repos.find(id);
  }

  async create(newMemoLink: MemoLink) {
    const { siteName, title, description, ogpUri } = await getHeadOfLink(
      newMemoLink.linkUri
    );

    const saveData: MemoLink = {
      ...newMemoLink,
      siteName,
      linkTitle: title,
      linkDescription: description,
      ogpUri,
    };
    const created = await this.repos.create(saveData);
    return created;
  }
}

export default MemoLinkService;
