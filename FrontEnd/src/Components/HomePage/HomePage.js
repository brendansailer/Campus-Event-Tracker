import Nav from "../Nav/Nav";
import HomeFeed from "./Feed/Feed";
import HomeDiscover from "./Discover/Discover";
import "./HomePage.css";
import { useHistory, useParams } from "react-router";
import { getCurrentUser } from "../../Common/Services/AuthService";

function HomePage() {
  const { userId } = useParams();
  const history = useHistory();
  if (!getCurrentUser()) {
    console.error("AUTHENTICATION ERROR");
    history.push("/login");
    return null;
  }
  if (getCurrentUser().id !== userId) {
    console.error("YOU SHOULD NOT BE HERE!");
    history.push("/home/" + getCurrentUser().id);
    return null;
  }

  //Html to be rendered for the HomePage
  return (
    <div className="page">
      <div className="grid-container">
        <div className="home-nav-container">
          <Nav></Nav>
        </div>
        <div className="home-feed-container">
          <HomeFeed></HomeFeed>
        </div>
        <div className="home-discover-container">
          <HomeDiscover></HomeDiscover>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
