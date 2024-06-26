import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          CONTACT-MS
        </Link>

        {user ? (
          <>
            <Link to="/dashboard" className="navbar-link">
              Contact
            </Link>
            <Link to="/register" className="navbar-link">
              {user.name}
            </Link>
            <Link to="/logout" className="navbar-link">
              LogOut
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
