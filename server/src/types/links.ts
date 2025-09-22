export type Link = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
};

export type LinkResponse = {
  items: Link[];
  page: number;
  perPage: number;
  total: number;
};

export type PartialLink = {
  id: string 
  originalUrl: string 
  clicks: number
}
