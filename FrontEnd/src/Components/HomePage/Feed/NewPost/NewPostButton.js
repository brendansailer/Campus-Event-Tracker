import React from "react";
import "./NewPost.css";

export default function NewPostButton(props) {
  return (
    <div className="new-post-btn-container">
      <button className="btn btn-primary new-post-btn" onClick={props.onClick}>
        <i className="fa fa-pencil"></i> Create New Post
      </button>
    </div>
  );
}
