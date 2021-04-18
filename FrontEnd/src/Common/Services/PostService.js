import Parse from "parse";
import { listUserFollows } from "./FollowService";
import { getUser } from "./UserService";

// Get posts from users a user is following
export const listUserPosts = () => {
  return listUserFollows()
    .then((follows) => {
      const Post = Parse.Object.extend("UserPost");
      const userPosts = new Parse.Query(Post);
      userPosts.containedIn(
        "user",
        follows.map((follow) => follow.get("followedUser"))
      );
      userPosts.include("user");
      userPosts.include(["user.name"]);
      return userPosts.find();
    })
    .then(
      (response) => {
        console.log("userPosts: " + response);
        return response;
      },
      (error) => {
        console.error("error with getting userPosts", error);
      }
    );
};

// Get posts from a specific user
export const listPostsByUser = (userId) => {
    return getUser(userId).then((user) => {
        const Post = Parse.Object.extend("UserPost");
        const postsByUser = new Parse.Query(Post);
        postsByUser.equalTo("user", user);
        return postsByUser.find();
    }).then((response) => {
        console.log("postsByUser: " + response)
        return response
    }, (error) => {
        console.error("error with getting postsByUser", error)
        return []
    });
}

export const createPost = (content) => {
  let currentUser = Parse.User.current();
  console.log(currentUser);
  return getUser(currentUser.id).then((user) => {
    const UserPost = Parse.Object.extend("UserPost");
    const newPost = new UserPost();

    newPost.set("content", content);
    newPost.set("user", user);

    return newPost.save().then(
      (result) => {
        console.log("UserPost created", result);
        return result;
      },
      (error) => {
        console.error("Error while creating UserPost: ", error);
      }
    );
  });
};
