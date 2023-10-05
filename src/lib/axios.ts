import { IProduct } from "@/types/product";
import { IUser } from "@/types/user";
import axios from "axios";

export const Fetch = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export const getProducts = async () => {
  const res = await Fetch('/products')
  return res.data as unknown as { data: IProduct[], msg: string }
}

export const getProduct = async (id: string) => {
  const res = await Fetch(`/products/${id}`)
  return res.data as unknown as { data: IProduct, msg: string}
}

export const getUser = async (id: string) => {
  const res = await Fetch(`/users/${id}`)
  return res.data as unknown as { data: IUser, msg: string }
}