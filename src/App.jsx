import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Home, NotFound, Login, Register, Profile } from "./pages";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext";
import { API_URL } from "./config";

const App = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/users/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message}`);
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (err) {
        console.error(err.message);
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="h-screen bg-neutral-200">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
