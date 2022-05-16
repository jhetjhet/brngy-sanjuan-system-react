import ProptTypes from "prop-types";

function PhotoInput({ initSrc }) {
    

    return (
        <div className="flex items-center">
            <div className="w-44 min-h-[11rem] max-h-64 overflow-hidden bg-parsley-300 m-auto rounded-sm">
                {initSrc && (
                    <img src={initSrc} />
                )}

            </div>
            <input type="file" />
        </div>
    );
}

PhotoInput.propTypes = {
    initSrc: ProptTypes.string,
}

export default PhotoInput;