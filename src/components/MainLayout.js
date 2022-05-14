import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";


export default function MainLayout(){

    return (
        <div className="flex flex-col min-h-screen">
            <Sidebar />
            <div className="ml-0 md:pl-64 transition-all duration-300 px-4 md:p-0">
                <Outlet />
            </div>
            <div className="ml-0 md:pl-64 transition-all duration-300 mt-auto">
                <Footer />
            </div>
        </div>
    );
}

