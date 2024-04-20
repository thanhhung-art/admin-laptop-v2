import { IOrder } from "@/types/order";
import { IProduct, IProductInSearch } from "@/types/product";
import { IReviewFull } from "@/types/reviews";
import axios from "axios";

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

export const Fetch = axios.create({
  baseURL: server_url,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getProducts = async (
  query?: "top_rating_products" | "top_sell_products" | "featured"
) => {
  const res = await Fetch(`/products?${query && "query=" + query}`);
  return res.data as unknown as { data: IProduct[]; msg: string };
};

export const getProductsInfinity = async (
  page: number,
  brand?: string,
  category?: string
) => {
  let temp = "";
  if (brand) temp += `&brand=${brand}`;
  if (category) temp += `&category=${category}`;
  const res = await Fetch(`/products?page=${page}${temp}`);
  return res.data as unknown as {
    data: { products: IProduct[]; nextPage: number; lastPage: number };
    msg: string;
  };
};

export const getProduct = async (id: string) => {
  const res = await Fetch(`/products/${id}`);
  return res.data as unknown as { data: IProduct; msg: string };
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
};

export const getOrdersByPhone = async (phone: string | null) => {
  const res = await Fetch(`/orders/phone?phone=${phone}`);
  return res.data as unknown as { data: IOrder[]; msg: string };
};

export const getReviews = async (pid: string) => {
  const res = await Fetch(`/reviews/${pid}`);
  return res.data as unknown as { data: IReviewFull[]; msg: string };
};

export const getReviewsInOrder = async (orderId: string) => {
  const res = await Fetch(`/reviews/order/${orderId}`);
  return res.data as unknown as { data: IReviewFull[]; msg: string };
};
