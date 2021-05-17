import React from "react";
import { Form } from "react-bootstrap"

export default function NewClubForm(props) {
  return (
    <div className="new-club-form">
      <form
        onSubmit={props.handleSubmit}
        className="new-club-form-input"
        autoComplete="off"
      >
        <div className="form-inline">
          <label className="form-check-label">
            Club Name
          </label>
          <input
            type="text"
            id="bodyText"
            className="form-control club-text-name"
            maxLength="40"
            onChange={props.handleNameUpdate}
            required
          />
        </div>
        <div className="form-inline">
          <label className="form-check-label">
            Club Description
          </label>
          <input
            type="text"
            id="bodyText"
            className="form-control club-text-desc"
            maxLength="100"
            onChange={props.handleDescriptionUpdate}
            required
          />
        </div>
      </form>
      <p style={{ fontSize: "smaller", color: "darkgray", marginTop: "5px" }}>
        {props.characterCount} characters remaining
      </p>
      <Form inline>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Topic </Form.Label>
          <Form.Control className="topic-select" as="select" custom onChange={props.handleTopicSelect}>
            {props.topics.map(topic => <option value={topic.topic_id} key={topic.topic_id}>{topic.topic_description}</option>)}
          </Form.Control>
        </Form.Group>
      </Form>
      <div className="new-club-btn">
        <button
            type="submit"
            value="Submit"
            className="btn btn-outline-light"
            onClick={props.handleSubmit}
        >Create Club <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
