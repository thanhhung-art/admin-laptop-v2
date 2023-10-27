import { IProductInCart } from "./product"

export interface IOrder {
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
}