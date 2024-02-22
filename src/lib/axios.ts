import { IOrder } from "@/types/order";
import { IProduct, IProductInSearch } from "@/types/product";
import { IReviewFull } from "@/types/reviews";
import { IUser } from "@/types/user";
import axios from "axios";

export const Fetch = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getProducts = async () => {
  const res = await Fetch("/products");
  return res.data as unknown as { data: IProduct[]; msg: string };
};

export const getProductsInfinity = async (param: number) => {
  const res = await Fetch(`/products?query=${param}`);
  return res.data as unknown as {
    data: { products: IProduct[]; nextPage: number; lastPage: number };
    msg: string;
  };
};

export const getProduct = async (id: string) => {
  const res = await Fetch(`/products/${id}`);
  return res.data as unknown as { data: IProduct; msg: string };
};

export const getMostSoldProducts = async () => {
  const res = await Fetch(`/products?query=top_sell_products`)
  return res.data as unknown as { data: IProduct[], msg: string };
}

export const editProfile = async (data: {
  userId: string;
  email?: string;
  phone?: string;
  username?: string;
  address?: string;
  address2?: string;
}) => {
  const res = await Fetch.put('/users/' + data.userId)
  return res.data as unknown as { data: IUser, msg: string };
};

export const getUser = async (id: string) => {
  const res = await Fetch(`/users/${id}`);
  return res.data as unknown as { data: IUser; msg: string };
};

export const getSearch = async (keyword: string | undefined) => {
  const res = await Fetch(`/products/search?keyword=${keyword}`);
  return res.data as unknown as {
    data: IProductInSearch[];
    msg: string;
  };
};

export const getOrders = async () => {
  const res = await Fetch(`/orders`);
  return res.data as unknown as { data: IOrder[]; msg: string };
}

export const getOrdersByPhone = async (phone: string | null) => {
  const res = await Fetch(`/orders?phone=${phone}`)
  return res.data as unknown as { data: IOrder[]; msg: string };
} 


export const getReviews = async (pid: string) => {
  const res = await Fetch(`/reviews/${pid}`)
  return res.data as unknown as { data: IReviewFull[], msg: string };
}