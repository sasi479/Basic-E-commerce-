import {useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './productdetails.css'
import { AppContext } from "./AppContext"
import useFetch from "./useFetch";



export default function ProductDetails() {
    let { id } = useParams();
    console.log(id)
    // let [product, setProduct] = useState({})
    let { cart, addToCart, updateCart, deleteCart } = useContext(AppContext);
  const {error,loading,data:product}=  useFetch(`https://fakestoreapi.com/products/${id}`,{},true);

    // let [loading, setLoading] = useState(true)
    // let [error, setError] = useState(null)
    // useEffect(() => {
    //     async function getProduct() {          
    //         try{
    //             setError(null)
    //             let res = await fetch(`https://fakestoreapi.com/products/${id}`);
    //             if(!res.ok){
    //                 throw new Error("Error while fetching")
                    
    //             }
    //             let data = await res.json();
    //             console.log("hello")
    //             setProduct(data);
    //         }
    //         catch(err){
    //             setError(err.message)
    //         }
    //         finally{
    //             setLoading(false);

    //         }
    //     }
    //     getProduct()
    // }, [])

    let index = cart.findIndex((item) => item.id === product.id);
    let renderStars=(rating)=>{
        let stars=[];
        let fullStars= Math.floor(rating);
        let  halfStar= rating%1>=0.5;
        let emptyStars= 5- fullStars-halfStar;
        for(let i=0;i<fullStars;i++){
            stars.push(<i key={`filled-${i}`} className="fa-solid fa-star filled"></i>)
        }
        for(let i=0;i<emptyStars;i++){
            stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>)
        }
        if(halfStar){
            stars.push(<i key={`half`}className="fa-solid fa-star-half-stroke"></i>)
        }
        return stars
    }
    
    return (
        <>
            {
                loading && (<p className="spinner"><i className="fa-solid fa-spinner fa-spin"></i></p>)

            }
            {
                error && (<p>{error}</p>)
            }
            {!error && !loading &&(
                <div className="wrapper">
                    <div className="product-img"><img src={product?.image} /></div>
                    <div className="product-details">
                        <p><b>{product?.category}</b></p>
                        <p>{product?.title}</p>
                        <p>{product?.description}</p>
                        <p>${product?.price}</p>
                        <div className="rating">
                        { renderStars(product?.rating?.rate)}
                        </div>  
                        {
                            index < 0?
                            (<button onClick ={()=>addToCart(product)} className="cart-btn">Add to Cart</button>):
                            (
                                <>
                                <p><button onClick={()=> updateCart(product.id,-1)}>➖</button> {cart[index].qty}  <button onClick={()=> updateCart(product.id,1)}>➕</button></p>
                                <button onClick = {()=> deleteCart(product.id)}className="cart-btn">Remove</button>
                                </>
                            )
                        }  
                    </div>
                </div>
            )
        }
        </>
    )
}