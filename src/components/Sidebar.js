import { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar";



import sanjuanlogo from "../assets/sanjuan-logo.png";
import loveunitylogo from "../assets/love-unity.png";
import kapvaleralogo from "../assets/kap-valera.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

function SidebarLink({ label, path }) {

    return (
        <NavLink
            to={path}
            className="block py-4 px-3 font-semibold hover:bg-gray-300 rounded-lg"
        >
            {label}
        </NavLink>
    );
}

function SidebarDropDown({ open, onOpen, label, id, options }) {
    const [optionsLinkMatch, setOptionsLinkMatch] = useState(false);

    return (
        <Fragment>
            <button
                className="w-full text-left py-4 px-3 flex items-center rounded-lg font-semibold hover:bg-gray-300"
                onClick={() => onOpen(id, open)}
            >
                {label}
                <div className="ml-auto mr-3">
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </button>
            <ul className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-96' : 'max-h-0'}`}>
                {options.map((option, i) => (
                    <li key={i}>
                        <Link 
                            to={option.path}
                            
                            className="block py-2 px-6 hover:bg-gray-300"
                        >{option.label}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    const OPTIONS = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Dashboard',
            id: 'dashboard',
            open: false,
            options: [
                {
                    label: 'Gender Chart',
                    path: 'chart/gender',
                },
                {
                    label: 'Religion Chart',
                    path: 'chart/religion',
                },
                {
                    label: 'Educational Attainment Chart',
                    path: 'chart/educatt',
                }
            ]
        },
        {
            label: 'Records',
            path: 'records',
        },
        {
            label: 'Import Record',
            path: 'records/import'
        },
        {
            label: 'User History',
            path: 'users/history'
        },
    ];

    const [options, setOptions] = useState(OPTIONS);
    const [currOpen, setCurrOpen] = useState(null);

    function toggleOneOption(options, target) {
        let newOption = options.map((option) => {
            if (option.options && Array.isArray(option.options)) {
                if (target === null || target === undefined)
                    option.open = false;
                else
                    option.open = option.id === target ? !option.open : false;
                return option;
            }
            return option;
        });
        return newOption;
    }

    const onOptionOpen = (id, open) => {
        let sameTarget = !currOpen || currOpen === id;

        if (sameTarget)
            setOptions((options) => toggleOneOption(options, id));
        else {
            setOptions((options) => toggleOneOption(options));
            setTimeout(() => {
                setOptions((options) => toggleOneOption(options, id));
            }, 700);
        }
        setCurrOpen(open ? null : id);
    }

    return (
        <Fragment>

            <Navbar 
                onMenuClick={() => setOpen(!open)}
            />

            <div className="fixed top-0 w-64 -left-64 md:left-0 transition-all duration-300 h-screen bg-gray-100 flex flex-col"
                style={open ? {left: 0} : {}}
            >
                <button className="absolute right-3 top-3 text-xl hover:text-broom-500 focus:text-broom-500 md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="w-full h-16 flex justify-center items-center bg-parsley-500">
                    <a href="#">
                        <img className="w-11" src={sanjuanlogo} alt="Barangay Sanjuan Logo" />
                    </a>
                </div>
                <div className="pt-1">
                    <ul className="w-full list-none">
                        {options.map((option, i) => (
                            <li className="px-3" key={i}>
                                {(option.options && Array.isArray(option.options)) ? (
                                    <SidebarDropDown
                                        label={option.label}
                                        id={option.id}
                                        open={option.open}
                                        onOpen={onOptionOpen}
                                        options={option.options}
                                    />
                                ) : (
                                    <SidebarLink
                                        key={i}
                                        label={option.label}
                                        path={option.path}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-auto">
                    <div className="h-24 flex mt-auto items-center justify-center space-x-3">
                        <img className="w-20" src={loveunitylogo} />
                        <img className="w-20" src={kapvaleralogo} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}