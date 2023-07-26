import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { fetchAllUsers } from "../store/userSlice";

const AllUsers = () => {
  const myUsers = useSelector((state) => state.users.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div>
        <div className="productList">
        <h2>Current Users</h2>
        {myUsers.length === 0 ? (
            <p className="infoMessage">Loading...</p>
        ) : myUsers.error ? (
            <p className="infoMessage">Error: {myUsers.error}</p>
        ) : (
            <div className="productUL">
            {myUsers.map((user) => {
                return (
                <div className="li" key={user.id}>
                    <h3>{user.username}</h3>
                </div>
                );
            })}
            </div>
        )}
        </div>
    </div>
  );
};

export default AllUsers;
