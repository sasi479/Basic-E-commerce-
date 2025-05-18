import { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";

export default function MyOrders() {
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null);
    let { userDetails } = useContext(AppContext);
    let [ orders, setOrders ] = useState([]);

    useEffect(() => {
        async function getMyOrders() {
            try {
                setError(null)
                let res = await fetch('http://localhost:5000/my-orders', {
                    // method: "POST",
                    // body: JSON.stringify(formData),
                    headers: {
                        "Authorization": `Bearer ${userDetails.token}`
                    }

                });
                if (!res.ok) {
                    throw new Error("Error while fetching")

                }
                let data = await res.json();
                console.log(Array.isArray(data))
                setOrders(data);
                console.log(data)
                console.log(orders)
            }
            catch (err) {
                setError(err.message)
            }
            finally {
                setLoading(false);
            }
        }
        getMyOrders()

    }, [])

    return (
        <>
            <h2>My Orders</h2>
            {
                Array.isArray(orders)?

                <div className="order-wrapper">

                {
                orders.map(order => (
                    <div key={order._id} className="order-card">
                        <p>order# : {order._id}</p>
                        <p>Ordered Items:</p>
                        {  
                            order?.items?.map(item => (
                                <div key={item.id} className="order-items">
                                    <div className="product-img"><Link to={`/products/${item.id}`}><img src={item?.image} /></Link></div>
                                    <div className="product-details">
                                        <p>{item?.title}</p>
                                        <p>{item?.qty} ❎${item?.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))}
                </div>

                :
                <></>
            }
        </>
    )
}