"use client"
import CartClientInfo from "@/components/CartClientInfo";
import CartMenuList from "@/components/CartMenuList";
import { CartContext } from "@/components/Providers";
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react";

/**
 * 
 * @returns 
 */
export default function OrderConfirmationPage() {
    const [clientInfo, setClientInfo] = useState()
    const [cartProducts, setCartProducts] = useState([])
    const{calculateTotalPrice} = useContext(CartContext)
    const {id} = useParams()
    let totalPrice = 0;

    const getOrderInfo = async () =>{
        if (id){
        const res = await fetch(`/api/getOrder?id=${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok){
        const result = await res.json();
        setClientInfo(result[0]?.clientInfo)
        setCartProducts(result[0]?.cartProducts)
        }else{
            console.log("Error to fetch order info")
        }
    }

    }
    
    // calculate total price
     if (cartProducts){
            console.log(new Date(cartProducts[0]?.createdAt).getDate());

     for (const product of cartProducts) {
       totalPrice += calculateTotalPrice(product);
     }
    }

    useEffect(() => {
        getOrderInfo()
    },[])
    return (
        <section className="p-4 flex gap-2">
            
        
        </section>
    )
}