import React from "react";

export default function NewPostForm(props) {
  return (
    <div className="new-post-form">
      <form
        onSubmit={props.handleSubmit}
        className="new-post-form"
        autoComplete="off"
      >
        <div className="input-group">
          <input
            type="text"
            id="bodyText"
            className="form-control post-text-body"
            maxLength="280"
            onChange={props.handleUpdate}
          />
          <div className="input-group-append">
            <button
              type="submit"
              value="Submit"
              className="btn btn-outline-light"
            >
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </form>
      <p style={{ fontSize: "smaller", color: "darkgray", marginTop: "5px" }}>
        {props.characterCount} characters remaining
      </p>
    </div>
  );
}
