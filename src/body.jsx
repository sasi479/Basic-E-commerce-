
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Login from './login';
import SignUp from './signUp';
import Home from './home';
import DashBoard from './dashboard';
import ProtectedRoute from './ProtectedRoute';
import {CategoryProducts} from './productslist';
import ProductDetails from './productdetails';
import { useContext } from 'react';
import { AppContext } from './AppContext';
import Cart from './cart';
import CheckOut from './checkOut';
import NotFound from './notFound';
import MyOrders from './myOrders';
export default function Body() {

    return (
        <>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login   />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/Dashboard" element={<ProtectedRoute><DashBoard/></ProtectedRoute>} >
                {/* <Route path="/Dashboard" element={<ProtectedRoute  Child={DashBoard}/>} > */}
                    {/* <Route path="users" element={<Users/>} />
                    <Route path="orders" element={<Orders />} /> */}

                </Route>
                <Route path="products/category/:category" element={<CategoryProducts/>} />
                <Route path="products/:id" element={< ProductDetails/>} />
                <Route path="/cart" element= {<Cart />}></Route>
                <Route path ="/checkout" element = { <CheckOut />}></Route>
                <Route path="/my-orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />

                <Route path ="*" element = { <NotFound />}></Route>
            </Routes>


        </>
    )
}






