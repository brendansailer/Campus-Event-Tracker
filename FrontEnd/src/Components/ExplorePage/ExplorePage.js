import Nav from "../Nav/Nav";
import "./ExplorePage.css";
import ExploreFeed from "./Feed/Feed";
import { useHistory, useParams } from "react-router";
import { getCurrentUser } from "../../Common/Services/AuthService";

function ExplorePage() {
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

  //Html to be rendered for the ExplorePage
  return (
    <div className="page">
      <div className="grid-container">
        <div className="explore-nav-container">
          <Nav></Nav>
        </div>
        <div className="explore-feed-container">
          <ExploreFeed></ExploreFeed>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
