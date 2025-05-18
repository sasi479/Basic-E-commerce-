// const { createRoot } = require("react-dom/client");

import { createRoot } from "react-dom/client"
import './app.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './header.jsx'
import Body from './body.jsx'
import Footer from './footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CounterWithUseState from "./usestate-vs-usereducer.jsx"
import Counter from "./usestate-vs-usereducer.jsx"
import { useState } from "react"
import { AppContext } from "./AppContext.js"

function App() {
    let username = localStorage.getItem("username") 
    let loggedIn= localStorage.getItem("loggedIn");
    let token = localStorage.getItem("token");
    let [userDetails, setUserDetails] = useState({username,loggedIn, token });
    let initialCart = JSON.parse(localStorage.getItem('cart') )|| []
    let [cart, setCart] = useState(initialCart);
    let addToCart = (product) => {
        let index = cart.findIndex((item) => item.id === product.id);
        let newCart;
        if (index < 0) {
            newCart = [...cart, { ...product, qty: 1 }]
        }
        else {

            newCart = cart.map((item) =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            )
        }

        setCart(newCart)
        localStorage.setItem('cart',JSON.stringify(newCart));
    }
    let updateCart= (pId,value) =>{
        let newCart = cart.map((item) =>
            
            item.id === pId ? { ...item, qty: Math.max(item.qty + value,0) } : item
        ).filter( item=>item.qty>0)
        setCart(newCart);
        localStorage.setItem('cart',JSON.stringify(newCart));

    }

    let clearCart=()=>setCart([])

    
    let deleteCart= (id) =>{
        // let index = cart.findIndex((item) => item.id === id);
        // let newCart = [...cart ];
        // newCart.splice(index, 1)

        let newCart= cart.filter((item) => item.id !== id);
        setCart(newCart);
        localStorage.setItem('cart',JSON.stringify(newCart));
    }
    return (
        <>
            <BrowserRouter>
                <AppContext.Provider value={{ userDetails , setUserDetails,cart, addToCart, updateCart,deleteCart,clearCart}} >
                        <Header />
                        {/* <Routes>
                    <Route path="/" element={<Body />} />
                </Routes> */}
                        <Body />
                        <Footer />
                </AppContext.Provider>
            </BrowserRouter>

        </>
    )

}

let rootEle = document.getElementById('root');

let root = createRoot(rootEle);

root.render(<App />)


