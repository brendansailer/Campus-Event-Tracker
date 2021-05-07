import Nav from "../Nav/Nav";
// import HomeFeed from "./Feed/Feed";
// import HomeDiscover from "./Discover/Discover";
import "./CalendarPage.css";
import { useHistory, useParams } from "react-router";
import { getCurrentUser } from "../../Common/Services/AuthService";
import CalendarWindow from "./Calendar/CalendarWindow";

export default function CalendarPage() {
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

  //Html to be rendered for the Calendar Page
  return (
    <div className="page">
      <div className="calendar-grid-container">
        <div className="calendar-nav-container">
          <Nav></Nav>
        </div>
        <div className="calendar-container">
          <CalendarWindow></CalendarWindow>
        </div>
        {/* <div className="home-discover-container">
          <HomeDiscover></HomeDiscover>
        </div> */}
      </div>
    </div>
  );
}