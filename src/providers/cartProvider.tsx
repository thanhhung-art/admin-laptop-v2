"use client";
import { createContext, useReducer, Dispatch } from "react";

interface IProductInCart {
  id: string;
  quantity?: number;
}

interface InitialState {
  products: IProductInCart[];
}

const initialState: InitialState = {
  products: [],
};

export const CartContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<{ action: string; payload: IProductInCart }>;
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
    if (window.localStorage.getItem('cart'))
      initialState.products = JSON.parse(window.localStorage.getItem('cart') || '[]');
    return initialState
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function reducer(
  state: InitialState,
  dispatch: { action: string; payload: IProductInCart }
) {
  let products: IProductInCart[] = [];

  switch (dispatch.action) {
    case "ADD_TO_CART":
      products = [...state.products, dispatch.payload];
      localStorage.setItem('cart', JSON.stringify(products))
      return {
        products,
      };

    case "REMOVE_FROM_CART":
      products = state.products.filter(
        (product) => product.id !== dispatch.payload.id
      ),
      localStorage.setItem('cart', JSON.stringify(products))
      return {
        products
      };

    case "CLEAR_CART":
      localStorage.setItem('cart', JSON.stringify([]))
      return {
        products: [],
      };

    case "INCREASE_QUANTITY":
      products = state.products.map((product) => {
        if (product.id === dispatch.payload.id && product.quantity) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      })
      localStorage.setItem('cart', JSON.stringify(products))
      return {
        products
      };

    case "DECREASE_QUANTITY":
      products = state.products.map((product) => {
        if (product.id === dispatch.payload.id && product.quantity) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
      return {
        products
      };

    default:
      return state;
  }
}
