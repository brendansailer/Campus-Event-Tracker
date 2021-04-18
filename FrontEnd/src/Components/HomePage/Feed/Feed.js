import React from "react";
import { useEffect, useState } from "react";
import { listUserPosts } from "../../../Common/Services/PostService";
import NewPost from "./NewPost/NewPost.js";
import Post from "./Post.js";
import "./Feed.css";
import { getCurrentUser } from "../../../Common/Services/AuthService";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  var currentUser = getCurrentUser();
  useEffect(() => {
    listUserPosts().then((userPosts) => {
      setPosts(userPosts.reverse());
    });
  }, []);

  const refreshFeed = () => {
    listUserPosts().then((userPosts) => {
      setPosts(userPosts.reverse());
    });
  };

  return (
    <div className="feed">
      <div>
        <h2 className="feed-header">
          {"Welcome, " + currentUser.get("firstName")}{" "}
        </h2>
      </div>
      <NewPost refreshFeed={refreshFeed} />
      <div className="post-info-container">
        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.get("user").get("username")}
            profileImage={post.get("user").get("profile_image")}
            body={post.get("content")}
          />
        ))}
      </div>
    </div>
  );
}
