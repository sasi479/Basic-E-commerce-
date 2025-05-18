import { Link} from "react-router-dom"

export default function NotFound(){
    return(
        <>
        <div className="not-found">
        <p>The page your are looking is not existed</p>
        <Link to ="/">Home</Link>
        </div>
        </>
    )
}