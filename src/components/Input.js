import PropTypes from 'prop-types';

function Input({ error, label, id, ...inputProps }) {

    return (
        <div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor={id}
                    className="mb-2 text-sm font-medium text-gray-900">
                    {error && <span className="text-red-500 mr-1">*</span>}{label}
                </label>

                <div className="relative">
                    <input
                        {...inputProps}
                        id={id}
                        className={`text-sm sm:text-base relative w-full border rounded-lg placeholder-gray-400 focus:border-parsley-500 focus:outline-none py-2 px-3 ${error ? 'border-red-500' : ''}`} />
                </div>

                {error && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error}
                    </span>
                )}
            </div>
        </div>
    );
}

Input.defaultProps = {
    onChange: () => {},
}

Input.protoTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
}

export default Input;