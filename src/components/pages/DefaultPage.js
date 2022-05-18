import sanjuanlogo from "../../assets/sanjuan-logo.png";

export default function DefaultPage(){


    return (
        <div className="w-full h-[calc(100vh-10rem)] flex">
            <div className="w-96 m-auto">
                <img src={sanjuanlogo} className="w-full opacity-75" />
            </div>
        </div>
    );
}