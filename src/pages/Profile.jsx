import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <>
          <p className="text-2xl text-center">Username: {user?.username}</p>
          <p className="text-2xl text-center">Email: {user?.email}</p>
        </>
      ) : (
        <p className="text-2xl text-center">
          User is not logged in, Please Login!
        </p>
      )}
    </div>
  );
};

export default Profile;
