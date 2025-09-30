export type BabolatProduct = {
  title: string;
  price: string;
  img_url: string | undefined;
};

export type BabolatRacketAPI = {
  count: number;
  products: BabolatProduct[];
};
