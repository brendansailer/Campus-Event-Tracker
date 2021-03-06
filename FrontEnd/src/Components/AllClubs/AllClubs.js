import Nav from "../Nav/Nav";
import "./AllClubs.css";
import ClubFeed from "./Feed/Feed";
import { useHistory, useParams } from "react-router";
import { getCurrentUser } from "../../Common/Services/AuthService";

function AllClubs() {
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

  //Html to be rendered for the AllClubs
  return (
    <div className="all-clubs-page-container">
      <div className="all-clubs-grid-container">
        <div className="all-clubs-nav-container">
          <Nav></Nav>
        </div>
        <div className="all-clubs-feed-container">
          <ClubFeed></ClubFeed>
        </div>
      </div>
    </div>
  );
}

export default AllClubs;
