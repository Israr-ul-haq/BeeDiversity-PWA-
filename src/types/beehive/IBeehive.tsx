export interface IBeehive {
  status: string;
  content: Content;
}

export interface Content {
  ownerId: string;
  name: string;
  description: string;
  id: string;
}
