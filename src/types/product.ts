export interface IProduct {
  _id: string;
  name: string;
  price: number;
  descriptions: string;
  instock: string;
  img: string;
  categories: string;
  rating: number;
  color: string;
  brand: string;
  weight: string;
  createdAt: Date;
  updatedAt: Date;

  configure: {
    ram: string;
    hardDisk: string;
    cpu: string;
    screen: string;
    camera: string;
    battery: string;
    os: string;
    gpu: string;
  };
  quantity?: number
  sold?: number
}

export interface IProductInCart {
  productId: string;
  quantity?: number;
}
export interface IProductInCheckout extends IProduct {
  quantity: number
}

export interface IProductInOrder extends IProduct {
  quantity: number
}

export interface IProductInSearch {
  _id: string
  name: string
  img: string
}