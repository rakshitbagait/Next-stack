import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../styles/global.css"

const Logo = () => {
    return (
       <Link to="/" className="logo">
            <img src={logo} alt="StackMaps Logo" className="logo-image" />

            <div className="logo-text">
                <h2>Stack<span>Maps</span></h2>
                
            </div>
        </Link>
    );
};

export default Logo;