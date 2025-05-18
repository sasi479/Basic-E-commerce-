import { useEffect, useState } from "react";

const useFetch = (url, options, autocall) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    async function fetchData(overrideOptions) {
        try {

            setLoading(true);
            setError(null)
            setData([])
            let finalOptions = overrideOptions || options
            const res = await fetch(url, finalOptions);

            if (!res.ok) {

                let error = await res.json();
                let errmsg = error.message || "Requested data not found"
                throw new Error(errmsg)
            }

            let result = await res.json();
            setData(result);
            return result


        }

        catch (err) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (autocall) {
            fetchData()
        }



    }, [])

    return { error, loading, data, fetchData }


}


export default useFetch