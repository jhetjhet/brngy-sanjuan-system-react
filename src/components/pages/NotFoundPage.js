import { Link } from "react-router-dom";


export default function NotFoundPage(){

    return (
        <div className="bg-gray-100 w-screen h-screen flex items-center justify-center">
            <div className="">
                <h1 className="text-9xl font-extrabold text-parsley-500">404</h1>
                <p>Page not found go <Link to="/" replace className="text-blue-500 hover:underline">home</Link> instead.</p>
            </div>
        </div>
    );
}