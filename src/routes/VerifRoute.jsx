import { Navigate, Outlet } from 'react-router-dom'
import {useUser} from "@/context/UserContext.jsx";

const VerifAuth = () => {
    const { user ,isPending } = useUser();

       if (isPending) {
        return null
    }
    return (
        !user ? <Outlet/> : <Navigate to='/'/>
    )
}

export default VerifAuth