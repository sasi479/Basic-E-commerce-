import { use, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

 export default function Header() {
   let  {userDetails , setUserDetails}= useContext(AppContext); 
    let { cart,addToCart } = useContext(AppContext);
    // let loggedIn= localStorage.getItem("loggedIn");
    // let user= localStorage.getItem("username");
    let cartCount= cart.reduce((acc,item)=> acc+item.qty , 0)

    let navigate = useNavigate();
    function handleLogOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        setUserDetails(null)
        navigate('/');
    }
    return (
        <>
            <div className="headerlinks">    
                <div className="header-left">
                    <Link to="/">Home</Link>
                    <Link to="/products/category/men">Mens Clothing</Link>
                    <Link to="/products/category/women">Women Clothing</Link>
                    <Link to="/products/category/electronics">Electronics</Link>
                    <Link to="/products/category/jewelery">jewelery</Link>
                    {/* <Link to="/Dashboard">Dashboard</Link> */}
                </div>
                <div className="header-right">
                    {
                    userDetails?.loggedIn?
                        <>
                        <div className="header-right-links">
                        <button onClick={handleLogOut}>Logout</button>
                        <p>Hello {userDetails.username} </p>
                        <Link to="/my-orders">my orders</Link>
                        </div>
                        </>:
                        <>
                        <Link to="/sign-up">Sign Up</Link>
                        <Link to="/login">Login</Link>
                        </>
                    }
                    <Link to="/cart"><button>🛒 <span>{cartCount}</span></button></Link> 
                </div>   
            </div>
        </>
    )
}