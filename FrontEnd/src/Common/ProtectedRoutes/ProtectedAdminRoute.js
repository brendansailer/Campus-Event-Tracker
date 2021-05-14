import { useEffect, useState } from "react";
import ProtectedRoute from "../AppTools/ProtectedRoutes";
import HomePageModule from "../../Components/HomePage/HomePage";
import ClubAdmin from "../../Components/ClubAdmin/ClubAdmin";
import { getCurrentUser } from "../Services/AuthService";
import { getDBUser } from "../../Common/Services/UserService.js";
import { useParams } from "react-router-dom";

const AdminRoute = () => {
  const { clubId } = useParams();
  const [flag, setFlag] = useState(false);
  const [dbUser, setDbUser] = useState();

  let currentUser = getCurrentUser();

  /*
  useEffect(() => {
    getDBUser(currentUser.get("username"), currentUser.get("email"))
      .then((user) => {
        setDbUser(user.user_id);
        fetch('/clubs/' + user.user_id, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then(response => response.json()).then(data => {
            setClubs(data)
        })
      })

  }, [currentUser]);
  */
  

  useEffect(() => {
    setFlag(true);
  }, []);

  return (
    <div>
      <ProtectedRoute
        exact
        path={flag ? "/admin/" + clubId : "/home/"}
        flag={flag}
        component={ClubAdmin}
      />
    </div>
  );
};

export default AdminRoute;
