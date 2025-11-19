export default interface MemoLink {
  id: number;
  linkUri: string;
  siteName?: string;
  linkTitle?: string;
  linkDescription?: string;
  ogpUri?: string;
  memo: string;
  userId: string;
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
