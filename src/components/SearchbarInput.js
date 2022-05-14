import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";

function SearchbarInput({ onSubmit }) {
    const [searchVal, setSearchVal] = useState('');

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(searchVal);
        }}>
            <div className="w-full bg-gray-100 border px-2 flex items-center group rounded-lg focus-within:border focus-within:border-parsley-400">
                <input
                    value={searchVal}
                    className="p-2 w-full bg-inherit focus:outline-none"
                    onChange={(e) => setSearchVal(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} className="ml-2 text-parsley-500" />
            </div>
        </form>
    );
};

SearchbarInput.defaultProps = {
    onSubmit: () => {},
}

SearchbarInput.propTypes = {
    onSubmit: PropTypes.func,
}

export default SearchbarInput;