import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "/cart_icon.jpg";
import profile_icon from "/profile.png";
import logo from "/R.png";
import { useContext, useState } from "react";
import { ShopContext } from "./Context/ShopContext";
import MultiSearch from "./Pages/Search";
import { AuthContext } from "./Context/AuthContext";
import { UserContext } from "./Context/UserContext";

const Navbar = () => {
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate;
  const userContext = useContext(UserContext);
  const user = userContext ? userContext.user : null;
  const setUser = userContext ? userContext.setUser : null;
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setLoggedIn(false);
    setDropdownOpen(false);
    navigate("/");
  };
  const { getTotalCartItems } = useContext(ShopContext);
  const userType =
    user && user.user_info
      ? user.user_info.user_type
      : user
      ? user.user_type
      : null;
  console.log(user);
  const userName =
    user && user.user_info ? user.user_info.name : user ? user.name : null;
  console.log(user);
  return (
    <nav>
      <div className="navbar">
        <div className="nave-logo">
          <img src={logo} alt="" />
          <p>E-Commerce</p>
        </div>
        <ul className="nav-menu">
          <li>
            <Link className="link" to="/">
              Home
            </Link>
            <hr />
          </li>
          {userType === "seller" && (
            <li>
              {/* TODO: products link only visible to seller*/}
              <Link className="link" to="/products">
                Products
              </Link>
              <hr />
            </li>
          )}
          {userType === "buyer" && (
            <li>
              <Link className="link" to="/orders">
                Orders
              </Link>
              <hr />
            </li>
          )}
        </ul>
        <MultiSearch />
        <div className="nav-cart-login-signup">
          {isLoggedIn ? (
            <div>
              <img
                className="Profile_IMG"
                src={profile_icon}
                alt="Profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <p>Hello, {userName}</p>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    Profile
                    <hr />
                  </Link>
                  <button onClick={handleLogout}>Sign out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>Sign up</button>
              </Link>
            </>
          )}
          <Link to="/cart">
            <img src={cart_icon} alt="" />
          </Link>
          <div className="cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
