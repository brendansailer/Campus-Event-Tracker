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
    var subs = [...subscriptions] // Create a copy of the subscriptions
    var index = subs.map(function(s) {return s.club_id}).indexOf(club_id) // Get the index of the club to remove
    subs.splice(index, 1) // Remove it
    setSubscriptions(subs) // Update the subscriptions
  };

  const deleteClub = (club_id) => () => {
    var subs = [...subscriptions] // Create a copy of the subscriptions
    var index = subs.map(function(s) {return s.club_id}).indexOf(club_id) // Get the index of the club to remove
    subs.splice(index, 1) // Remove it
    setSubscriptions(subs) // Update the subscriptions
  };

  return (
    <div className="user-clubs">
      <h3>Your clubs</h3>
      <div className="subscription-container">
        {subscriptions.map((subscription) => (
          <SubscriptionTile
            key={subscription.club_id}
            club_name={subscription.club_name}
            club_description={subscription.club_description}
            rank={subscription.rank}
            deleteClub={deleteClub(subscription.club_id)}
            eventHandler={unsubscribe(subscription.club_id)}
          />
        ))}
      </div>
    </div>
  );
}
