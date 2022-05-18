import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sanjuanlogo from "../../assets/sanjuan-logo.png";
import { useAthentication } from "../Authentication";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [, setCookie, ] = useCookies();
    const [user, login,, getuser] = useAthentication();

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: '/', replace: true } };

    useEffect(() => {
        if(user)
            navigate(from, { replace: true });
    }, [user]);

    useEffect(() => {
        getuser();
        if(!localStorage.getItem(process.env.REACT_APP_DO_REMEMBER_PASSWORD))
            localStorage.setItem(process.env.REACT_APP_DO_REMEMBER_PASSWORD, remember);
        else
            setRemember(localStorage.getItem(process.env.REACT_APP_DO_REMEMBER_PASSWORD).trim().toLocaleLowerCase() === 'true');
    }, []);

    useEffect(() => {
        localStorage.setItem(process.env.REACT_APP_DO_REMEMBER_PASSWORD, remember);
    }, [remember]);

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        login(username, password, (resp, err) => {
            if(!err){
                setCookie(process.env.REACT_APP_AUTH_TOKEN, resp.data.auth_token, {
                    path: '/',
                    expires: 0,
                });
                navigate(from, { replace: true });
            }else{
                if(err.response && err.response.status === 400){
                    setErrors(err.response.data.non_field_errors);
                }
            }
        });
    }

    return (
        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-100 h-screen">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Link to={"/"} replace>
                        <img className="mx-auto h-20 w-auto" src={sanjuanlogo} alt="Workflow" />
                    </Link>
                    <h1 className="text-center mt-3 font-bold text-2xl text-broom-500">Barangay San Juan</h1>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit} >
                    <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-parsley-500 focus:border-parsley-500 focus:z-10 sm:text-sm" placeholder="Username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-parsley-500 focus:border-parsley-500 focus:z-10 sm:text-sm" placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-parsley-600 focus:ring-parsley-500 border-gray-300 rounded" 
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                            </div>

                            {/* <div className="text-sm">
                                <a href="#" className="font-medium text-parsley-600 hover:text-parsley-500"> Forgot your password? </a>
                            </div> */}
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-parsley-600 hover:bg-parsley-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-parsley-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-parsley-500 group-hover:text-parsley-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                            { (errors.length > 0) && (
                                <p className="text-xs text-center text-red-500 mt-3">{errors[0]}</p>
                            )}
                        </div>
                </form>
            </div>
        </div>
    );
}