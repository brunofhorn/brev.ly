export type ILink = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks?: number;
  createdAt: string;
};

export type LinksListItemProps = {
  link: ILink;
};

export type PaginatedLinks<T> = {
  items: T[];
  page: number;
  perPage: number;
  total: number;
};

export type LinksSkeletonProps = {
  rows?: number;
};
