import { IProductInCart } from "./product"

export interface IOrder {
  _id?: string
  userId: string
  username: string
  phone: string
  email?: string
  address: string
  address2?: string
  products: IProductInCart[]
  payment: string
  status: string
  note: string
  totalPrice: number
  createdAt?: string
  updatedAt?: string
}

export interface IProductInOrder {
  _id: string
  name: string
  img: string
  price: number
}

