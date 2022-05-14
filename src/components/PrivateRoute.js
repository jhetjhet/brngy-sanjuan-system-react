import { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { useAthentication } from "./Authentication";


export default function PrivateRoute({ children }){
    const [checkDone, setCheckDone] = useState(false);
    const [user,,,getuser] = useAthentication();
    const [cookies] = useCookies();

    const location = useLocation();

    useEffect(() => {
        getuser(() => setCheckDone(true));
    }, [location.pathname]);

    if(!checkDone)
        return null;

    if(!user)
        return <Navigate to="/admin/login" state={{from: location}} replace />

    return children;
}