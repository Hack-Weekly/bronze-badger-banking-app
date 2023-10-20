import "./navbar.scss"
import placeholder from "../../assets/react.svg";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={placeholder} alt=""/>
                <span>Banking App</span>
            </div>
            <div className="icons">
                <img src={placeholder} alt="" className="icon"/>
                <img src={placeholder} alt="" className="icon"/>
                <div className="user">
                    <img src={placeholder} alt=""/>
                    <span>User</span>
                </div>
                <img src={placeholder} alt="" className="icon"/>
            </div>
        </div>
    )
}

export default Navbar