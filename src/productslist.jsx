import { useContext, useEffect, useState } from "react"
import './productlistcss.css'
import { Link, useParams, useSearchParams } from "react-router-dom"
import { AppContext } from "./AppContext"
import useFetch from "./useFetch"


export default function ProductsList() {
    // let [products, setProducts] = useState([])
    let [counter, setCounter] = useState(0)
    // let [loading, setLoading] = useState(true)
    // let [error, setError] = useState(null)

  const {error,loading,data:products}=  useFetch('https://fakestoreapi.com/products',{},true);

  console.log(products)

  /*  useEffect(() => {
        async function getProducts() {
           try{
            setError(null)
            let res = await fetch('https://fakestoreapi.com/products');
            if(!res.ok){
                throw new Error("Error while fetching")
                
            }
            let data = await res.json()
            setProducts(data);
           }
           catch(err){
            setError(err.message)
           }
           finally{
            setLoading(false);
           }
        }
        getProducts()

    }, [counter])

*/
    return (
        <>  
        {
            loading && (<p className="spinner"><i className="fa-solid fa-spinner fa-spin"></i></p>)
        }
        {
            error && (<p>{error}</p>)
        }
        {
        !error && !loading &&(
            <div className="productsList">
            {
                products.map((product) => (
                    <ProductsCard product={product}  key={product.id} />
                )
                )
            }
            </div>
        )
        }
        </>
    )
}


export function CategoryProducts() {
    let { category } = useParams();
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    // let [quryparams] = useSearchParams();
    // console.log(quryparams.get('param1'))
    // console.log(quryparams.get('param2'))

    if (category == "men") {
        category = "men's clothing"
    }
    else if (category == "women") {
        category = "women's clothing"
    }

    let [products, setProducts] = useState([])
    useEffect(() => {
        async function getProducts() {
            try{
             setError(null)
             let res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
             if(!res.ok){
                 throw new Error("Error while fetching")
                 
             }
             let data = await res.json()
             setProducts(data);
            }
            catch(err){
             setError(err.message)
            }
            finally{
             setLoading(false);
            }
        }
        getProducts()

    }, [category])

    return (
        <>
            {
                loading && (<p className="spinner"><i className="fa-solid fa-spinner fa-spin"></i></p>)
            }
            {
                error && (<p>{error}</p>)
            }
           { products.length > 0 ? <h2>{category}</h2>:(
           <>
            <div className="not-found">
            <p>The products your are looking is not existed</p>
            <Link to ="/">Home</Link>
            </div>
            </>
           )     
            }

            {
            !error && !loading && products.length >0 &&(
                <div className="productsList">
                    {
                        products.map((product) => (
                            <ProductsCard product={product} key={product.id} />
                        )
                        )
                    }
                </div>
            )
            }
        </>
    )
}


function ProductsCard({ product }) {
    let { cart,addToCart } = useContext(AppContext)
    return (
        <>
            <div className="products">
                <div id="productimg"><img src={product?.image} /></div>
                <p className="product-title">{product?.title}</p>
                <p>${product?.price}</p>
                <Link className="view-details" to={`/products/${product.id}`}>View Details</Link>
                <button onClick ={()=>addToCart(product)} className="view-details">Add to cart</button>
            </div>
        </>
    )
}




