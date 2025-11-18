import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {useUser} from "@/context/UserContext.jsx";

const VerifAuth = () => {
    const { user ,isPending } = useUser();
    const route = useLocation().pathname;

    console.log(isPending);
    console.log(user);

       if (isPending) {
        return null
    }
    console.log("route verif", user, route);
    console.log(user ? "accès" : "allow access to ");
    return (
        !user ? <Outlet/> : <Navigate to='/'/>
    )
}

export default VerifAuth