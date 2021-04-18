import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProtectedRoute from "../AppTools/ProtectedRoutes";
import UpdateProfileModule from "../../Components/UpdateProfile/UpdateProfile";
import { getCurrentUser } from "../Services/AuthService";

const UpdateProfileRoute = () => {
  const [flag, setFlag] = useState(false);

  const currentUser = getCurrentUser();
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    if (currentUser.id === userId) {
      setFlag(true);
      console.log("TRUE");
    } else {
      console.log("FALSE");
      setFlag(false);
    }
  }, [currentUser, userId]);

  return (
    <div>
      <ProtectedRoute
        exact
        path={"/profile/" + currentUser.id + "/update"}
        flag={flag}
        component={UpdateProfileModule}
      />
    </div>
  );
};

export default UpdateProfileRoute;
