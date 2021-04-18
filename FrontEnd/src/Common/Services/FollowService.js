import Parse from "parse";
import { getUser } from "./UserService";

// Default user, TODO: incorporate auth and login flow so that user is set dynamically

export const getFollow = async (followedUser) => {
  let currentUser = Parse.User.current();
  return getUser(currentUser.id)
    .then((user) => {
      const Follow = Parse.Object.extend("Follow");
      const query = new Parse.Query(Follow);
      query.equalTo(user);
      query.equalTo("followedUser", followedUser);
      return query.find();
    })
    .then(
      (follow) => {
        console.log("Follow found", follow);
      },
      (error) => {
        console.error("Error while fetching Follow", error);
      }
    );
};

// Display all users a user is following
export const listUserFollows = () => {
  let currentUser = Parse.User.current();
  return getUser(currentUser.id)
    .then((user) => {
      const Follow = Parse.Object.extend("Follow");
      const query = new Parse.Query(Follow);
      query.equalTo("user", user);
      return query.find();
    })
    .then(
      (follows) => {
        console.log("Follows found", follows);
        return follows;
      },
      (error) => {
        console.error("Error while fetching Follow", error);
      }
    );
};

export const createUserFollow = (followedUserId) => {
  let currentUser = Parse.User.current();
  getUser(followedUserId)
    .then((followedUser) => {
      const Follow = Parse.Object.extend("Follow");
      const newFollow = new Follow();

      newFollow.set("user", currentUser);
      newFollow.set("followedUser", followedUser);

      newFollow.save();
    })
    .then(
      (follow) => {
        console.log("Follow created", follow);
        return follow;
      },
      (error) => {
        console.error("Error while creating Follow: ", error);
      }
    );
};

export const deleteUserFollow = (follow) => {
  const Follow = Parse.Object.extend("Follow");
  const query = new Parse.Query(Follow);
  query.get(follow).then((object) => {
    object.destroy().then(
      (response) => {
        console.log("Deleted Follow", response);
      },
      (error) => {
        console.error("Error while deleting Follow", error);
      }
    );
  });
};
