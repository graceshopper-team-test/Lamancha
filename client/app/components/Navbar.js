import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/store";
import "./Navbar.css";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

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
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <Link className="navName" to="/products">
              Shop
            </Link>
            <Link className="navName" to="/cart">
              Cart
            </Link>
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
            <Link className="navName" to="/cart">
              Cart
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
