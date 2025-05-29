import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './signup-login.css'
import { AppContext } from "./AppContext";
import useFetch from "./useFetch";
const baseURL= import.meta.env.VITE_API_BASE_URL

export default function Login() {

    let { userDetails, setUserDetails } = useContext(AppContext);
    let [formData, setFormdata] = useState({ username: "", password: "" });
    
    const { error, loading, fetchData } = useFetch('${baseURL}/login', {}, false);


    let navigate = useNavigate();

    const location = useLocation();


    const redirectPath = location?.state?.redirect || "/"

    console.log(location)

    useEffect(() => {

        if (localStorage.getItem('loggedIn')) {
            navigate('/')
        }

    }, [])
    async function handleLogin(e) {
        e.preventDefault();

        let options = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        let data = await fetchData(options);


        if(!!data){
            localStorage.setItem('token', data.token);
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('username', data.username);
            setUserDetails({ username: data.username, loggedIn: true, token: data.token })
            navigate(redirectPath);

        }





        // try {
        //     let res = await fetch('http://localhost:5000/login', {
        //         method: "POST",
        //         body: JSON.stringify(formData),
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     } )
        //     if(res.ok){
        //      let data=  await res.json()
        //         localStorage.setItem('token',data.token);
        //         localStorage.setItem('loggedIn', true);
        //         localStorage.setItem('username', data.username);
        //         setUserDetails({username: data.username ,loggedIn : true,token:data.token})
        //         navigate(redirectPath);
        //     }
        //     else{
        //         let error = await res.json();
        //         setError(error.message)
        //     }
        // }

        // catch (err) {

        // }
    }

    return (
        <>
            <div className="form-css">
                <form onSubmit={handleLogin}>
                    <h3>Login In</h3>
                    <label>Username</label> <input type="text" name="username" value={formData.username}
                        onChange={(e) => { setFormdata({ ...formData, username: e.target.value }) }}
                    /><br />
                    <label>Password</label> <input type="password" name="password" value={formData.password}
                        onChange={(e) => { setFormdata({ ...formData, password: e.target.value }) }}
                    /><br />
                    <button>Login</button>
                </form>
            </div>
            {
                error && (<p>{error}</p>)
            }
        </>
    )
}



