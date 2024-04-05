import { IProductInCart, IProductInCheckout } from "@/types/product";
import { create } from "zustand";

export type TCartStore = {
  products: IProductInCart[];
  initStore: () => void;
  addProduct: (productId: string, color: string) => void;
  increaseQuantity: (productId: string, color: string) => void;
  decreaseQuantity: (productId: string, color: string) => void;
  removeProduct: (productId: string, color: string) => void;
  clearStore: () => void;
};

const addProduct = (
  products: IProductInCart[],
  productId: string,
  color: string
) => {
  const temp = [...products, { productId, color, quantity: 1 }];
  localStorage.setItem("cart", JSON.stringify(temp));
  return temp;
};

const removeProduct = (
  products: IProductInCart[],
  productId: string,
  color: string
) => {
  const temp = products.filter(
    (product) => !(product.productId === productId && product.color === color)
  );
  localStorage.setItem("cart", JSON.stringify(temp));
  return temp;
};

const increaseQuantity = (
  products: IProductInCart[],
  productId: string,
  color: string
) => {
  const temp = products.map((product) =>
    product.productId === productId && product.color === color
      ? { ...product, quantity: product.quantity + 1 }
      : product
  );
  localStorage.setItem("cart", JSON.stringify(temp));
  return temp;
};

const decreaseQuantity = (
  products: IProductInCart[],
  productId: string,
  color: string
) => {
  const temp = products.map((product) =>
    product.productId === productId && product.color === color
      ? {
          ...product,
          quantity: product.quantity > 0 ? product.quantity - 1 : 0,
        }
      : product
  );
  localStorage.setItem("cart", JSON.stringify(temp));
  return temp;
};

const clearStore = () => {
  localStorage.setItem("cart", JSON.stringify([]));
  return [];
};

const getInitialCart = (): IProductInCart[] => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
    return [];
  }
};

export const useStore = create<TCartStore>()((set) => ({
  products: [],
  initStore: () => {
    set(() => {
      return { products: getInitialCart() };
    });
  },
  addProduct: (productId, color) => {
    set((state) => ({
      products: addProduct(state.products, productId, color),
    }));
  },
  increaseQuantity: (productId, color) => {
    set((state) => {
      const products = increaseQuantity(state.products, productId, color);
      localStorage.setItem("cart", JSON.stringify(products));
      return {
        products,
      };
    });
  },
  decreaseQuantity: (productId, color) => {
    set((state) => {
      const products = decreaseQuantity(state.products, productId, color);
      localStorage.setItem("cart", JSON.stringify(products));
      return {
        products,
      };
    });
  },
  removeProduct: (productId, color) => {
    set((state) => ({
      products: removeProduct(state.products, productId, color),
    }));
  },
  clearStore: () => {
    set(() => ({
      products: clearStore(),
    }));
  },
}));
