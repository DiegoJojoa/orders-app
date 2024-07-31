import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Product } from "../types";
import { apiBaseUrl } from "../api";

export const useCart = () => {
  const initialCart = (): Product[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [products, setProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/Producto/ConsultarProductos`
        );
        console.log("response", response);
        const data = await response.json();
        const products: Product[] = data.data;
        console.log(products);
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  function addToCart(item: Product) {
    const itemExist = cart.findIndex(
      (guitar) => guitar.codProd == item.codProd
    );
    if (itemExist >= 0) {
      console.log("Ya existe en el carrito", itemExist);
      const updatedCart = [...cart];
      if (updatedCart[itemExist]?.quantity) {
        updatedCart[itemExist].quantity++;
      }
      setCart(updatedCart);
    } else {
      console.log("Agregado al carrito");
      setCart((prevCart) => [...prevCart, item]);
      item.quantity = 1;
    }
  }

  function removeFromCart(id: Product["codProd"]) {
    const updatedCart = cart.filter((guitar) => guitar.codProd !== id);
    setCart(updatedCart);
  }

  function increaseQuantity(id: Product["codProd"]) {
    const updatedCart = cart.map((guitar) => {
      if (
        guitar.codProd === id &&
        guitar.quantity &&
        guitar.quantity < MAX_QUANTITY
      ) {
        guitar.quantity++;
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id: Product["codProd"]) {
    const updatedCart = cart.map((guitar) => {
      if (
        guitar.codProd === id &&
        guitar.quantity &&
        guitar.quantity > MIN_QUANTITY
      ) {
        guitar.quantity--;
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  // function saveLocalStorage() {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // State derivado
  const isEmptyCart = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, guitar) => total + (guitar?.quantity ?? 0) * guitar.precio,
        0
      ),
    [cart]
  );

  return {
    products,
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmptyCart,
    cartTotal,
  };
};
