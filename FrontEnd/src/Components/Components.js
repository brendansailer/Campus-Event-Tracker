import HomePageModule from "./HomePage/HomePage";
import ExplorePageModule from "./ExplorePage/ExplorePage"
import ProfilePageModule from "./ProfilePage/ProfilePage";
import ProtectedUpdateProfilePageModule from "../Common/ProtectedRoutes/UpdateProfileRoute";
import UpdateProfilePageModule from "./UpdateProfile/UpdateProfile";
import AuthModule from "./Auth/Auth";
import ProtectedHomeRouteModule from "../Common/ProtectedRoutes/ProtectedHomeRoute";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import AuthRegister from "./Auth/AuthRegister/AuthRegister";

const Components = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/profile/:userId/update-auth"
          component={ProtectedUpdateProfilePageModule}
        />
        <Route
          path="/profile/:userId/update"
          component={UpdateProfilePageModule}
        />
        <Route path="/profile/:userId" component={ProfilePageModule} />
        <Route path="/explore/:userId" component={ExplorePageModule} />
        <Route path="/home-auth" component={ProtectedHomeRouteModule} />
        <Route path="/home/:userId" component={HomePageModule} />
        <Route path="/register" exact component={AuthRegister} />
        <Route path="/login" component={AuthModule} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default Components;
