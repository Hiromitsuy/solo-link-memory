export default interface MemoLink {
  id: number;
  linkUri: string;
  memo: string;
  createdAt?: Date;
  updatedAt?: Date;
}
