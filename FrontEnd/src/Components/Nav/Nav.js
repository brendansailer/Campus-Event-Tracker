import { Link, useHistory } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../../Common/Services/AuthService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import "./Nav.css";
import Logout from "./Logout/Logout";
import Login from "./Login/Login";

const Nav = () => {
  const history = useHistory();

  const onClickHandler = () => {
    console.log("Click");
    logoutUser().then((result) => {
      console.log(result);
      history.push("/login");
    });
  };

  return (
    <div className="nav">
      <div className="nav-items">
        <h1 style={{ color: "#057BFE", paddingRight: "10px" }}>
          <span style={{ color: "#057BFE", paddingRight: "10px" }}>
            eveNDts
          </span>
          <FontAwesomeIcon icon={faCalendarCheck} />
        </h1>
        {getCurrentUser() &&
          <ul className="nav-list">
            <li>
              <Link to="/home-auth">
                <i style={{ marginRight: "5px" }} className="fa fa-home"></i>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li>
              <Link to={"/explore/" + getCurrentUser().id}>
                <i style={{ marginRight: "9px" }} className="fa fa-compass"></i>
                <span className="nav-text">Explore</span>
              </Link>
            </li>
              <li>
                <Link to={"/profile/" + getCurrentUser().id}>
                  <i style={{ marginRight: "9px" }} className="fa fa-user"></i>
                  <span className="nav-text">Profile</span>
                </Link>
              </li>
              <li>
                <Link to={"/clubs/" + getCurrentUser().id}>
                  <i style={{ marginRight: "9px" }} className="fa fa-users"></i>
                  <span className="nav-text">All Clubs</span>
                </Link>
              </li>
          </ul>
        }   
        {getCurrentUser() ?
          <div className="logout">
            <Logout onClick={onClickHandler} />
          </div>
          :
          <div className="login">
            <Login onClick={onClickHandler} />
          </div>
        }
      </div>
    </div>
  );
};

export default Nav;
