import { useRef, useState } from "react"

export default function Regform() {



       let [uname,setName]= useState('');
       let [email,setEmail]= useState('');
       let [mobile,setMobile]= useState('');
    let [user, setUser] = useState({ uname: null, email: null, mobile: null })
    function updateUser() {
        // setName("sasi");
        // setEmail("sasi@gmail.com")
        // setMobile(989898989)
        if (!!uname && !!email && !!mobile) {

            // let newState = { uname: uname, email: email, mobile: mobile }
            // setUser(newState);

        }
        else {
            alert("enter 3 values")
        }
     

        
    }
    let updateName=(e)=>setName(e.target.value)
    let updateEmail=(e)=>setEmail(e.target.value)
    let updateMobile=(e)=>setMobile(e.target.value)
function updateUserData(e){

    const{name,value}=  e.target;
    if(name=="username")
        setName(value)
    else if(name=="email")
        setEmail(value)
    else if(name=="mobile")
         setMobile(value)


        
    
}
    return (
        <>
            <h3>regestration Form</h3>
                <label>Name</label> <input type="text" value={uname} onChange={ updateUserData} name="username" /><br />
                <label>Email</label> <input type="email" value={email} onChange={ updateUserData} name="email" /><br />
                <label>Phone</label> <input type="number" value={mobile} onChange={ updateUserData} name="mobile" />
                <button  onClick={updateUser}>Update</button>
            <UserTable uname={uname} email={email} mobile={mobile} />
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