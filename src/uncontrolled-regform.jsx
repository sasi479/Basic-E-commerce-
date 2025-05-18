import { useRef, useState } from "react"

export default function Regform() {

   let emailref= useRef();
   let usernameref= useRef();
   let mobileref=useRef();

    //    let [name,setName]= useState(null);
    //    let [email,setEmail]= useState(null);
    //    let [mobile,setMobile]= useState(null);
    let [user, setUser] = useState({ uname: null, email: null, mobile: null })
    function updateUser() {
        console.dir(emailref);
        // emailref.current.value="swathi@gmail.com"
        console.dir(emailref.current);
        let uname = usernameref.current.value;
        let email = emailref.current.value;
        let mobile = mobileref.current.value;
        // setName(name);
        // setEmail(email);
        // setMobile(mobile);
        if (!!uname && !!email && !!mobile) {

            let newState = { uname: uname, email: email, mobile: mobile }
            setUser(newState)
        }
        else {
            alert("enter 3 values")
        }
    }

    return (
        <>
            <h3>regestration Form</h3>
                <label>Name</label> <input type="text" ref= {usernameref} name="username" /><br />
                <label>Email</label> <input type="email" ref={emailref} name="email" /><br />
                <label>Phone</label> <input type="number" ref={mobileref} name="mobile" />
                <button  onClick={updateUser}>Update</button>
            <UserTable uname={user.uname} email={user.email} mobile={user.mobile} />
            {/* <UserTable {...user} /> */}
            {/* <UserTable {...{...user,password:"swathi"}}/> */}
            {/* <UserTable {name:"",}/> */}

        </>
    )
}

function UserTable(obj) {
// function UserTable({ uname, email, mobile }) {

    // console.log(password)


    // obj.uname="swathi"

    if (obj.uname && obj.email && obj.mobile) {
        return (
            <table border={1}>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                </tr>
                <tr>
                    <td>{obj.uname}</td>
                    <td>{obj.email}</td>
                    <td>{obj.mobile}</td>
                </tr>
            </table>
        )

    }
    else {
        return <p>No User Data</p>
    }
}