import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import './signup-login.css'
const baseURL= import.meta.env.VITE_API_BASE_URL
export default function SignUp() {

    let [formData, setFormdata] = useState({ username: "", email: "", password: "" });

   let [success,setSuccess]= useState(false)
   let [error,setError]= useState(false)

    let navigate = useNavigate()
    async function handleLogin(e) {
        e.preventDefault();
        setSuccess(false)
        setError("")
        try {
            let res = await fetch(`${baseURL}/register`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            } )
            if(res.ok){
               setSuccess(true);
               setTimeout(
                ()=> navigate('/login'),2000
               )
               
            }
            else{
                let error = await res.json();
                setError(error.message)
            }
        }

        catch (err) {

        }
    }

    return (
        <>
            <div className="form-css">
            <h3>Create Account</h3>
            <form onSubmit={handleLogin}>
                <label>Username</label> <input type="text" name="username" value={formData.username}
                    onChange={(e) => { setFormdata({ ...formData, username: e.target.value }) }}
                /><br />
                <label>Email</label> <input type="email" name="email" value={formData.email}
                    onChange={(e) => { setFormdata({ ...formData, email: e.target.value }) }}
                /><br />
                <label>Password</label> <input type="password" name="password" value={formData.password}
                    onChange={(e) => { setFormdata({ ...formData, password: e.target.value }) }}
                /><br />
                <button>SignUp</button>
            </form>
            </div>
            {
                success && (<p>Signup success redirecting to login page</p>)
            }

            {

                error && (<p>{error}</p>)
            }
        </>
    )
}

