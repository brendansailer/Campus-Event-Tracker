import { useEffect, useState } from "react";
import { getSuggested } from "../../../../Common/Services/UserService";
import UserConnect from "./UserConnect/UserConnect";
import "./FriendSuggestions.css";

//STATEFUL PARENT COMPONENT
const FriendSuggestions = () => {
  //set up the state
  const [users, setUsers] = useState([]);

  //useEffect to run when the page loads to obtain async data
  useEffect(() => {
    getSuggested().then((users) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  return (
    <div className="suggestions-container">
      <h1 className="title">Suggestions For You</h1>
      <ul className="friend-suggestions-list">
        {users.map((user) => {
          return (
            <UserConnect
              key={user.id}
              picture={user.get("profile_image")}
              firstName={user.get("firstName")}
              lastName={user.get("lastName")}
            ></UserConnect>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendSuggestions;
