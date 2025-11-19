export default interface MemoLink {
  id: number;
  linkUri: string;
  siteName?: string;
  linkTitle?: string;
  linkDescription?: string;
  ogpUri?: string;
  memo: string;
  createdAt?: Date;
  updatedAt?: Date;
}
