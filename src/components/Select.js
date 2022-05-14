import PropTypes from 'prop-types';

function Select({ value, onSelect, options, label, error }) {

    return (
        <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">{error && <span className="text-red-500 mr-1">*</span>}{label}</label>
            <select 
                value={value || ''}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-parsley-500 block w-full p-2.5 outline-none ${error ? 'border-red-500' : ''}`}
                onChange={(e) => onSelect(e.target.value)}
            >
                {options && options.map((option, i) => (
                    <option 
                        key={i}
                        className="py-4"
                        value={option.value || ''}
                    >{option.label || option.value}</option>
                ))}
            </select>
            {error && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {error}
                </span>
            )}
        </div>
    );
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    })).isRequired,
}

export default Select;