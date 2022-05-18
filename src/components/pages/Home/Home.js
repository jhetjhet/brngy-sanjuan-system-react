import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import sanjuanlogo from "../../../assets/sanjuan-logo.png";
export default function Home() {

    const INTERESTS_OPTIONS = [
        {
            label: 'Record of Barangay Inhabitant',
            value: '/chart',
        },
        {
            label: 'List of Voters',
            value: '/voters',
        },
        {
            label: 'Record 2',
            value: '/record2',
        },
        {
            label: 'Record 3',
            value: '/record3',
        },
    ]

    const [interest, setInterest] = useState(INTERESTS_OPTIONS[0].value);

    const navigate = useNavigate();

    const onInterestSelect = (e) => {
        setInterest(e.target.value);
    }

    const next = () => {
        navigate(interest, {replace: true});
    }

    return (
        <div className="w-screen h-screen">
            <div className="fixed top-0 w-screen h-screen -z-50 flex items-center justify-center">
                <img src={sanjuanlogo} alt="san juan logo" className="h-64 opacity-50" />
            </div>

            <h1 className="font-extrabold text-4xl md:text-5xl text-center md:text-left ml-0 md:ml-8 pt-10 text-broom-600">
                Barangay San Juan
            </h1>

            <div className="mx-3 md:ml-8 mt-8 flex flex-col max-w-xl">
                <label htmlFor="interests" className="text-2xl mb-2 font-semibold">Choose Records<span className="text-red-600 ml-1">*</span></label>
                <select id="interests" className="p-3 text-xl md:text-2xl font-normal appearance-none bg-clip-padding bg-gray-300 cursor-pointer bg-no-repeat rounded-md focus:outline-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,<svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'><path d='m0,6l12,12l12,-12l-24,0z'/><path fill='none' d='m0,0l24,0l0,24l-24,0l0,-24z'/></svg>")`,
                        backgroundPositionX: '98%',
                        backgroundPositionY: '50%',
                    }}
                    onChange={onInterestSelect}
                    value={interest}
                >
                    {INTERESTS_OPTIONS.map((opt, i) => (
                        <option
                            key={i}
                            value={opt.value}
                        >{opt.label}</option>
                    ))}
                </select>
                <button className="py-2 px-4 bg-parsley-500 ml-auto mt-2 text-white rounded-md">
                    <div className="hover:translate-x-3 transition-all duration-700" onClick={next}>
                        Next
                        <FontAwesomeIcon icon={faArrowRightLong}
                            className="ml-1"
                        />
                    </div>
                </button>
            </div>

            {/* <div className="fixed bottom-12 right-12 flex items-center space-x-4">
                <a href="#" className="bg-broom-300 py-2 px-3 rounded-full flex">
                    Chat with us
                    <img src={waveHandIcon} alt="wave hand icon"
                        className="w-6 ml-2"
                    />
                </a>
                <div className="relative">
                    <p className="w-5 h-5 bg-red-500 text-center text-white text-sm rounded-full absolute -top-1 right-0">1</p>
                    <a href="#">
                        <img src={messageIcon} alt="message icon"
                            className="w-16"
                        />
                    </a>
                </div>
            </div> */}
        </div>
    );
}