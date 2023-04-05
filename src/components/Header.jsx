import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { API_URL } from "../config";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useContext(AuthContext);

  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/users/logout`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unable to Logout!");
      const data = await res.json();
      toast.success(data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[5vh] bg-[#333] px-16">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">Task List</h1>
        <div className="flex items-center gap-20 text-[#f1f1f1]">
          <Link to="/">HOME</Link>
          <Link to="/profile">PROFILE</Link>
          {isAuthenticated ? (
            <button type="button" onClick={logoutHandler} disabled={isLoading}>
              LOGOUT
            </button>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
