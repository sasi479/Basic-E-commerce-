import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function CheckOut (){
    let  {userDetails , cart,clearCart}= useContext(AppContext); 
    let totalPrice =  cart.reduce((acc,item)=> acc+item.qty*item.price , 0); //1000 - 200
    let totalDiscount = cart.reduce((acc,item)=> acc+((item.price*(item.discount??0)/100))*item.qty , 0);
    let finalPrice= totalPrice-totalDiscount;
    const navigate= useNavigate()
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    let [paymentMethod, setPaymentmethod] = useState("Cash on Delivery")


       useEffect(
        ()=>{
            if(!userDetails?.loggedIn){
                navigate('/login',{state:{redirect:"/checkout"}})
            }
        }
      ,[] )
    
    const handlePlaceOrder = async ()=>{
        const orderData = {
            items: cart,
            totalAmount: finalPrice,
            paymentMethod
        }
        try{
            setError(null)
            let res = await fetch('http://localhost:5000/place-order', {
                method: "POST",
                body: JSON.stringify(orderData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${userDetails.token}`
                }
            } )
            console.log(res)
            if(!res.ok){
                throw new Error("Error while placing Order")
                
            }
            // let data = await res.json();
            clearCart()
            localStorage.removeItem('cart')
            navigate('/')

            }
            catch(err){
            setError(err.message)
            }
            finally{
            setLoading(false);
            }
    }
    return(
        <>
         <h2>CheckOut</h2>
         <div >
            <p>Order Summary</p>
            <p>Total Price: { totalPrice.toFixed(2)}</p>
            <p>Total Discount: { totalDiscount.toFixed(2)}</p>
            <p>Final Price: {finalPrice.toFixed(2) }</p>

            <Link className="check-out" onClick={handlePlaceOrder }> Place your order</Link>
        </div>
        </>
    )
}