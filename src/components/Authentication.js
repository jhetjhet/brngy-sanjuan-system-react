import axios from "axios";
import { createContext, Fragment, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";

const AuthenticationContext = createContext();

export function useAthentication(){
    return useContext(AuthenticationContext);
}


export function AuthenticationProvider({ children }){
    const [user, setUser] = useState(null);
    const [cookies] = useCookies();

    const login = (username, password, cb) => {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        axios.post('http://localhost:8000/auth/token/login/', data).then((resp) => {
            if(cb)
                cb(resp, null);
        }).catch((err) => {
            if(cb)
                cb(null, err);
        });
    }

    const logout = () => {
        const auth_token = cookies[process.env.REACT_APP_AUTH_TOKEN];
        axios.post('http://localhost:8000/auth/token/logout/', {}, {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
        }).then((resp) => {
            setUser(null);
        }).catch((err) => {

        });
    }

    const getuser = (cb) => {
        const auth_token = cookies[process.env.REACT_APP_AUTH_TOKEN];
        axios.get('http://localhost:8000/auth/users/me/', {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
        }).then((resp) => {
            setUser(resp.data);
        }).catch((err) => {
            setUser(null)
        }).finally(() => {
            if(cb)
                cb();
        });
    }

    return (
        <AuthenticationContext.Provider
            value={[user, login, logout, getuser]}
        >
            { children }
        </AuthenticationContext.Provider>
    );
}