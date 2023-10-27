"use client";
import { IProductInCart } from "@/types/product";
import { createContext, useReducer, Dispatch } from "react";

interface InitialState {
  products: IProductInCart[];
}

const initialState: InitialState = {
  products: [],
};

export const CartContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<{ action: string; payload?: IProductInCart }>;
}>({
  state: initialState,
  dispatch: () => {},
});

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (window.localStorage.getItem("cart"))
      initialState.products = JSON.parse(
        window.localStorage.getItem("cart") || "[]"
      );
    return initialState;
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function reducer(
  state: InitialState,
  dispatch: { action: string; payload?: IProductInCart }
) {
  let products: IProductInCart[] = [];

  switch (dispatch.action) {
    case "ADD_TO_CART":
      if (dispatch.payload) products = [...state.products, dispatch.payload];
      localStorage.setItem("cart", JSON.stringify(products));
      return {
        products,
      };

    case "REMOVE_FROM_CART":
      if (dispatch.payload) {
      }
      (products = state.products.filter(
        (product) =>
          dispatch.payload && product.productId !== dispatch.payload.productId
      )),
        localStorage.setItem("cart", JSON.stringify(products));
      return {
        products,
      };

    case "CLEAR_CART":
      localStorage.setItem("cart", JSON.stringify([]));
      return {
        products: [],
      };

    case "INCREASE_QUANTITY":
      if (dispatch.payload)
        products = state.products.map((product) => {
          if (
            dispatch.payload &&
            product.productId === dispatch.payload.productId &&
            product.quantity
          ) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
      localStorage.setItem("cart", JSON.stringify(products));
      return {
        products,
      };

    case "DECREASE_QUANTITY":
      products = state.products.map((product) => {
        if (
          dispatch.payload &&
          product.productId === dispatch.payload.productId &&
          product.quantity
        ) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      return {
        products,
      };

    default:
      return state;
  }
}
