import React from "react";
// import { useEffect, useState } from "react";
// import Post from "../../../Components/HomePage/Feed/Post";
// import NewPost from "../../../Components/HomePage/Feed/NewPost/NewPost";
import "../../../Components/HomePage/Feed/Feed.css";
// import { getCurrentUser } from "../../../Common/Services/AuthService";

export default function UserFeed(props) {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   listPostsByUser(props.userId).then((userPosts) => {
  //     console.log(userPosts);
  //     setPosts(userPosts);
  //   });
  // }, [props.userId]);

  // const refreshFeed = () => {
  //   listPostsByUser(props.userId).then((userPosts) => {
  //     console.log(userPosts);
  //     setPosts(userPosts);
  //   });
  // };

  return (
    <div className="feed">
      {/* {getCurrentUser() && getCurrentUser().id === props.userId && <NewPost refreshFeed={refreshFeed} /> } */}
      <div className="post-container">
        {/* {posts.map((post) => (
          <Post
            key={post.id}
            profileImage={post.get("user").get("profile_image")}
            username={post.get("user").get("username")}
            body={post.get("content")}
          />
        ))} */}
      </div>
    </div>
  );
}
