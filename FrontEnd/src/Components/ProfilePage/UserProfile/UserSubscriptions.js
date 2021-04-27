import React from "react";
import { getCurrentUser } from "../../../Common/Services/AuthService";
import { getUserSubscriptions } from "../../../Common/Services/SubscriptionService";
import { getDBUser } from "../../../Common/Services/UserService";
import { useEffect, useState } from "react";
import SubscriptionTile from "./SubscriptionTile"
import "../../../Components/HomePage/Feed/Feed.css";

export default function UserSubscriptions(props) {
  const [subscriptions, setSubscriptions] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    getDBUser(currentUser.get("username"), currentUser.get("email"))
      .then((user) => getUserSubscriptions(user.user_id))
      .then((userSubscriptions) => {
        setSubscriptions(userSubscriptions.subscriptions)
      })
  }, [currentUser]);
  console.log(subscriptions)

  // const refreshFeed = () => {
  //   listPostsByUser(props.userId).then((userPosts) => {
  //     console.log(userPosts);
  //     setPosts(userPosts);
  //   });
  // };

  return (
    <div className="feed">
      {/* {getCurrentUser() && getCurrentUser().id === props.userId && <NewPost refreshFeed={refreshFeed} /> } */}
      <div className="subscription-container">
        {subscriptions.map((subscription) => (
          <SubscriptionTile
            key={subscription.club_id}
            club_name={subscription.club_name}
            club_description={subscription.club_description}
          />
        ))}
      </div>
    </div>
  );
}
