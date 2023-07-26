import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/store";
import "./Navbar.css";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin);
  console.log("isAdmin", isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  const cartItems = useSelector((state) => state.cart);
  const itemsQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <h1 className="title">FS-App-Template</h1>
      <nav className="nav">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link className="navName" to="/home">
              Home
            </Link>
            <Link className="navName" to="/products">
              Shop
            </Link>
            <Link className="navName" to="/cart">
              Cart
            </Link>
            <div>
              {isAdmin ? (
                <div>
                  <Link className="navName" to="/admin">
                    Admin
                  </Link>
                  <Link className="navName" to="/users">
                    Users
                  </Link>
                  <button
                    className="buttonAdminLogout"
                    type="button"
                    onClick={logoutAndRedirectHome}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div className="login">
            {/* The navbar will show these links before you log in */}
            <Link className="navName" to="/login">
              Login
            </Link>
            <Link className="navName" to="/signup">
              Sign Up
            </Link>
            <Link className="navName" to="/products">
              Shop
            </Link>
            {itemsQuantity <= 0 ? (
              <Link className="navName" to="/cart">
                Cart
              </Link>
            ) : (
              <Link className="navName" to="/cart">
                Cart({itemsQuantity})
              </Link>
            )}
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
