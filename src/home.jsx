import { useContext } from "react";
import ProductsList from "./productslist";
import { AppContext } from "./AppContext";

export default function Home (){
   let {setName}= useContext(AppContext); 

    return(
        <>

        {/* <button onClick={ ()=>{setName("test");localStorage.setItem('username','test')}}>update  context</button>
        <button onClick={()=>localStorage.setItem('username','swathi')}>update localstorage</button> */}
        <ProductsList />
        </>
    )
}

