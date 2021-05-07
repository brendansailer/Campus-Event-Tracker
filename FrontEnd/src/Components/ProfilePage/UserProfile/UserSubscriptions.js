import React from "react";
import { getCurrentUser } from "../../../Common/Services/AuthService";
import { deleteSubscription, getUserSubscriptions } from "../../../Common/Services/SubscriptionService";
import { getDBUser } from "../../../Common/Services/UserService";
import { useEffect, useState } from "react";
import SubscriptionTile from "./SubscriptionTile"

export default function UserSubscriptions(props) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [dbUser, setDbUser] = useState({});
  const currentUser = getCurrentUser();

  useEffect(() => {
    getDBUser(currentUser.get("username"), currentUser.get("email"))
      .then((user) => {
        setDbUser(user)
        return getUserSubscriptions(user.user_id)
      })
      .then((userSubscriptions) => {
        setSubscriptions(userSubscriptions.subscriptions)
      })
  }, [currentUser]);

  const unsubscribe = (club_id) => () => {
    deleteSubscription(dbUser.user_id, club_id)
  };

  return (
    <div className="feed">
      {/* {getCurrentUser() && getCurrentUser().id === props.userId && <NewPost refreshFeed={refreshFeed} /> } */}
      <div className="subscription-container">
        {subscriptions.map((subscription) => (
          <SubscriptionTile
            key={subscription.club_id}
            club_name={subscription.club_name}
            club_description={subscription.club_description}
            eventHandler={unsubscribe(subscription.club_id)}
          />
        ))}
      </div>
    </div>
  );
}
