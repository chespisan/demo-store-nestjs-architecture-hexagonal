export interface ProductEntity {
  id?: string | number;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
}

export interface ParamsEntity {
  limit: number;
  offset: number;
}
