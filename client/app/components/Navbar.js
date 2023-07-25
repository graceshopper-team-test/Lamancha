import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
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
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <Link to="/products">Shop</Link>
            {itemsQuantity <= 0 ? (
              <Link to="/cart">Cart</Link>
            ) : (
              <Link to="/cart">Cart({itemsQuantity})</Link>
            )}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">Shop</Link>
            {itemsQuantity <= 0 ? (
              <Link to="/cart">Cart</Link>
            ) : (
              <Link to="/cart">Cart({itemsQuantity})</Link>
            )}
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
