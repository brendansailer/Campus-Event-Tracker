import HomePageModule from "./HomePage/HomePage";
import ExplorePageModule from "./ExplorePage/ExplorePage"
import ProfilePageModule from "./ProfilePage/ProfilePage";
import ProtectedUpdateProfilePageModule from "../Common/ProtectedRoutes/UpdateProfileRoute";
import UpdateProfilePageModule from "./UpdateProfile/UpdateProfile";
import AuthModule from "./Auth/Auth";
import ProtectedHomeRouteModule from "../Common/ProtectedRoutes/ProtectedHomeRoute";
import IndividualEventPage from "./IndividualEventPage/IndividualEventPage";
import IndividualClubPage from "./IndividualClubPage/IndividualClubPage";
import AllClubsModule from "./AllClubs/AllClubs";
import ClubAdminModule from "./ClubAdmin/ClubAdmin";
import ProtectedAdminModule from "../Common/ProtectedRoutes/ProtectedAdminRoute";

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
        <Route path="/clubs/:userId" component={AllClubsModule} />
        <Route path="/register" exact component={AuthRegister} />
        <Route path="/login" component={AuthModule} />
        <Route path="/event/:eventId" component={IndividualEventPage} />
        <Route path="/club/:clubId" component={IndividualClubPage} />
        <Route path="/admin/:clubId" component={ClubAdminModule} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default Components;
