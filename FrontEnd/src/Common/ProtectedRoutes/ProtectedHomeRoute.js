import { useEffect, useState } from "react";
import ProtectedRoute from "../AppTools/ProtectedRoutes";
import CalendarPageModule from "../../Components/CalendarPage/CalendarPage";
import { getCurrentUser } from "../Services/AuthService";

const HomeRoute = () => {
  const [flag, setFlag] = useState(false);

  let currentUser = getCurrentUser();
  useEffect(() => {
    if (getCurrentUser()) {
      setFlag(true);
    } else {
      console.log("UNAUTHORIZED");
      setFlag(false);
    }
  }, []);

  return (
    <div>
      <ProtectedRoute
        exact
        path={flag ? "/home/" + currentUser.id : "/home/"}
        flag={flag}
        component={CalendarPageModule}
      />
    </div>
  );
};

export default HomeRoute;
