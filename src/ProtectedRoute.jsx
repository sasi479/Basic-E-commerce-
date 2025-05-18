import { Navigate } from "react-router-dom";

export default function  ProtectedRoute({children}){
    // export default function  ProtectedRoute({Child}){
    let loggedIn= localStorage.getItem("loggedIn");

    // let role="Admin"

    return loggedIn? children: <Navigate to= "/login" />
    

}