export interface IBeehives {
  pageInfo: PageInfo;
  status: string;
  content: Content[];
}
export interface Graphs {
  id: string;
  content: [];
}

export interface Content {
  ownerId: string;
  name: string;
  description: string;
  id: string;
}

export interface PageInfo {
  totalItems: number;
  currentItems: number;
  skippedItems: number;
}
