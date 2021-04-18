import React, { useState } from "react";
import NewPostButton from "./NewPostButton.js";
import NewPostForm from "./NewPostForm.js";
import "./NewPost.css";
import { createPost } from "../../../../Common/Services/PostService";

export default function NewPost(props) {
  const [isCreatingPost, setCreatingPosts] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [characterCount, setCharacterCount] = useState(280);

  const handleInputUpdate = (event) => {
    event.preventDefault();
    setPostBody(event.target.value);
    setCharacterCount(280 - event.target.value.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost(postBody);
    props.refreshFeed();
    setCreatingPosts(false);
  };

  return (
    <div className="new-post-container">
      {!isCreatingPost ? (
        <NewPostButton onClick={() => setCreatingPosts(true)} />
      ) : (
        <NewPostForm
          handleUpdate={handleInputUpdate}
          handleSubmit={handleSubmit}
          value={postBody}
          characterCount={characterCount}
        />
      )}
    </div>
  );
}
