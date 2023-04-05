import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, isLoading, setIsLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim())
      return toast.error("Please fill all the fields");

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message}`);

      toast.success(data.message);

      setIsLoading(false);
      setIsAuthenticated(false);
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center ">
      <div className="w-[350px] bg-white border border-gray-300 p-4 space-y-3">
        <p className="text-2xl font-semibold text-center">Register</p>
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            placeholder="Enter your Username..."
            className="border border-gray-300 p-2 outline-none w-full"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="email"
            placeholder="Enter your Email..."
            className="border border-gray-300 p-2 outline-none w-full"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter your Password..."
            className="border border-gray-300 p-2 outline-none w-full"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="submit"
            className="w-full bg-[#333] p-2 rounded text-[#f1f1f1]"
            disabled={isLoading}
          >
            Register
          </button>
          <p className="text-center font-semibold">OR</p>
          <Link
            to="/login"
            className="w-full bg-[#333] p-2 rounded text-[#f1f1f1] text-center"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
