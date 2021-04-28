import Nav from "../Nav/Nav";
import "./AllClubs.css";
import ClubFeed from "./Feed/Feed";
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
        <div className="clubs-nav-container">
          <Nav></Nav>
        </div>
        <div className="home-feed-container">
          <ClubFeed></ClubFeed>
        </div>
        <p>SEE ME</p>
      </div>
    </div>
  );
}

export default HomePage;
