"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const CartContext = createContext({});
//retrieve the longitude and latitude of current location (business location)
export const UserLocationContext = createContext();
//retrieve  the longitude and latitude of client location
export const ClientLocationContext = createContext();

const Providers = ({ children, session }) => {
  const [cartProducts, setCartProducts] = useState([]);
  // store the current location of business
  const [userLocation, setUserLocation] = useState();
  //store the client's location
  const [clientLocation, setClientLocation] = useState();

  // keep cart content even if refresh the page
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }, [localStorage]);

  function saveProductsToLocalStorage(cartProducts) {
    if (localStorage) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  // clear cart shopping
  function clearCart() {
    setCartProducts([]);
    saveProductsToLocalStorage([]);
  }

  // remove product from cart shipping
  function removeCartProduct(indexToRemove) {
    setCartProducts((prev) => {
      const newCartProducts = prev.filter(
        (v, index) => index !== indexToRemove
      );
      saveProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Item is removed");
  }

  function addToCart(product, sizes = null, extra = [], specialRequest = "") {
    setCartProducts((prev) => {
      const newProduct = [
        ...prev,
        { ...product, sizes, extra, specialRequest },
      ];
      saveProductsToLocalStorage(newProduct);
      return newProduct;
    });
  }

  //calculate the total price
  const calculateTotalPrice = (product) => {
    let totalPrice = parseFloat(product.price?.replace(/[$,]/g, "") || 0);

    if (product.sizes) {
      totalPrice += parseFloat(product.sizes.price || 0);
    }
    if (product.extra?.length > 0) {
      for (const extra of product.extra) {
        totalPrice += parseFloat(extra.price || 0);
      }
    }
    if (product.discount > 0) {
      totalPrice = totalPrice - (totalPrice * product.discount) / 100;
    }

    return totalPrice;
  };

  return (
    <SessionProvider session={session}>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          clearCart,
          removeCartProduct,
          calculateTotalPrice,
        }}
      >
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
          <ClientLocationContext.Provider
            value={{ clientLocation, setClientLocation }}
          >
            {children}
          </ClientLocationContext.Provider>
        </UserLocationContext.Provider>
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default Providers;
