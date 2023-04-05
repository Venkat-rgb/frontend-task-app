import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Content from "../components/Content";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="h-[90vh]">
      {isAuthenticated ? (
        <Content />
      ) : (
        <p className="text-2xl">Please Login First</p>
      )}
    </div>
  );
};

export default Home;
