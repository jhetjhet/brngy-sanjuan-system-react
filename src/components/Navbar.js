import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAthentication } from "./Authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ onMenuClick }) {

    const [,, logout] = useAthentication();

    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/admin/login/', {replace: true});
    }

    return (
        <nav className="w-full h-16 bg-parsley-500 pl-0 md:pl-64 transition-all duration-300 flex items-center">
            <button className="text-2xl text-gray-900 hover:text-broom-500 ml-3 block md:hidden"
                onClick={onMenuClick}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>
            <button 
                className="ml-auto mr-6 font-bold text-broom-500 hover:text-broom-300 text-xl"
                onClick={onLogout}
            >Logout</button>
        </nav>
    );
}

Navbar.defaultProps = {
    onMenuClick: () => {},
}

Navbar.propTypes = {
    onMenuClick: PropTypes.func,
}

export default Navbar;