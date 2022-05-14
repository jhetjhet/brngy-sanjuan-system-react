import { cloneElement, forwardRef, Fragment, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPrint,
} from "@fortawesome/free-solid-svg-icons";
import ReactToPrint from "react-to-print";

export default function Printable({ children }){
    const compToPrintRef = useRef();

    // const toPrintChildren = cloneElement(
    //     children,
    //     {ref: compToPrintRef}
    // )

    return (
        <Fragment>
            <ReactToPrint
                trigger={() => (
                    <div className="fixed right-0 top-[4.3rem]">
                        <button className="text-white bg-gray-700 opacity-25 rounded-l-md text-2xl pl-1 pr-2 hover:pr-4 hover:opacity-50 transition-all duration-300">
                            <FontAwesomeIcon icon={faPrint} />
                        </button>
                    </div>
                )}
                content={() => compToPrintRef.current}
            />
            <div ref={compToPrintRef}>
                { children }
            </div>
        </Fragment>
    )
}