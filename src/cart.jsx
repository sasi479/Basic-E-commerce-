import { useContext } from "react"
import { AppContext } from "./AppContext"
import './cart.css'
import { Button } from "bootstrap"
import { Link, useParams, useSearchParams } from "react-router-dom"


export default function Cart() {

    let { cart, updateCart, deleteCart } = useContext(AppContext);

    let totalPrice =  cart.reduce((acc,item)=> acc+item.qty*item.price , 0); //1000 - 200
    let totalDiscount = cart.reduce((acc,item)=> acc+((item.price*(item.discount??0)/100))*item.qty , 0);
    let finalPrice= totalPrice-totalDiscount;

    return (
        <>
            <h2>My cart</h2>
            {   
                cart.length == 0 ?
                (
                <>
                <p className="cart-text">Your cart is empty</p>
                <Link className="cart-shop-now" to="/">Shop Now</Link>
                </>
                ) :
                (
                <div className="main-cart-group">
                
                <div className="cart-group">
                <div  className="main-cart-wrapper">
                <p className="price-details">Items List ({cart.length} items)</p>
                {
                    cart.map(product => (
                    <div key={product.id} className="cart-list">
                        <div className="product-img"><Link to={`/products/${product.id}`}><img src={product?.image} /></Link></div>
                        <div className="product-details">
                            <p>{product?.title}</p>
                            <p>${product?.price}</p>
                            <p> <button onClick={() => updateCart(product.id, -1)}>➖</button> {product?.qty} <button onClick={() => updateCart(product.id, 1)}>➕</button></p>
                            <button onClick={() => deleteCart(product.id)} className="cart-btn">Remove</button>
                        </div>
                    </div>
                    ))
                }
                </div>
                <div className="cart-total">
                    <p className="price-details">Price details ({cart.length} items)</p>
                    <div><span>Total Price: </span> <span className="price">${ totalPrice.toFixed(2)} </span></div>
                    <div><span>Total Discount: </span> <span className="price">${ totalDiscount.toFixed(2)} </span></div>
                    <div><span>Final Price: </span> <span className="price"> ${finalPrice.toFixed(2) } </span></div>

                    <Link className="check-out" to="/checkout"> Proceed to checkout</Link>
                </div>
                </div>
                </div>
                )
                
            }
        </>
    )
}