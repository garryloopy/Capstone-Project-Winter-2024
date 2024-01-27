"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const CartContext = createContext({})

const Providers = ({ children, session }) => {
  const [cartProducts, setCartProducts] = useState([]);

  // keep cart content even if refresh the page
  const localStorage = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (localStorage && localStorage.getItem('cart')){
      setCartProducts(JSON.parse(localStorage.getItem('cart')))
    }
  },[])

  function saveProductsToLocalStorage(cartProducts){
    if (localStorage){
      localStorage.setItem('cart', JSON.stringify(cartProducts))
    }
  }

  // clear cart shopping
  function clearCart () {
    setCartProducts([])
    saveProductsToLocalStorage([])
  }

  // remove product from cart shipping
  function removeCartProduct (indexToRemove){
    setCartProducts(prev => {
      const newCartProducts = prev.filter((v,index)=> index !== indexToRemove)
      saveProductsToLocalStorage(newCartProducts)
      return newCartProducts
    })
          toast.success("Item is removed");

  }


  function addToCart (product, size=null, extra=[]){
   setCartProducts(prev => {
    const newProduct = [...prev, {...product, size, extra}]
    saveProductsToLocalStorage(newProduct)
    return newProduct
   })
  }

  //calculate the total price
  const calculateTotalPrice = (product) => {
    let totalPrice = parseFloat(product.price?.replace(/[$,]/g, "") || 0);

    if (product.size) {
      totalPrice += parseFloat(product.size.price || 0);
    }
    if (product.extra?.length > 0) {
      for (const extra of product.extra) {
        totalPrice += parseFloat(extra.price || 0);
      }
    }

    return totalPrice;
  };

  return (
    <SessionProvider session={session}>
      <CartContext.Provider
        value={{ cartProducts, setCartProducts, addToCart,clearCart, removeCartProduct,calculateTotalPrice, }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default Providers;
