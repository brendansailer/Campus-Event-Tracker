import React, { useEffect, useState } from "react";
import NewClubForm from "./NewClubForm"
import { getTopics } from "../../../Common/Services/TopicService";
import { createClub } from "../../../Common/Services/ClubService";
import "./NewClub.css"
import { subscribeUserToClub } from "../../../Common/Services/SubscriptionService";

export default function NewClub(props) {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [characterCount, setCharacterCount] = useState(100);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();

  const handleNameUpdate = (event) => {
    event.preventDefault();
    setClubName(event.target.value);
  };

  const handleDescriptionUpdate = (event) => {
    event.preventDefault();
    setClubDescription(event.target.value);
    setCharacterCount(100 - event.target.value.length);
  };

  const handleTopicSelect = (event) => {
    event.preventDefault();
    setSelectedTopic(event.target.value)
    console.log(selectedTopic)
  };
  console.log(selectedTopic)

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics.topics);
      setSelectedTopic(topics.topics[0].topic_id);
    });
  }, []);
  console.log("TOPICS", topics)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("CLUB NAME:", clubName, clubDescription, selectedTopic)
    createClub(clubName, clubDescription, selectedTopic).then(response => {
      console.log("create club response", response)
      console.log("SUB data", props.userId, response.club_id)
      return subscribeUserToClub(props.userId, response.club_id, "1")
    }).then(response => {
      console.log(response)
      props.onClubCreate()
    })
  };

  return (
    <div className="new-club-container">
        <NewClubForm
            handleNameUpdate={handleNameUpdate}
            handleDescriptionUpdate={handleDescriptionUpdate}
            handleSubmit={handleSubmit}
            clubName={clubName}
            clubDescription={clubDescription}
            characterCount={characterCount}
            topics={topics}
            handleTopicSelect={handleTopicSelect}
        />
    </div>
  );
}

// @club_api.route('/club/create', methods=['POST'])
// def create_club():
//     con, cur = get_connection()

//     club_name = request.json['club_name']
//     club_description = request.json['club_description']
//     topic_id = request.json['topic_id']

//     club_id_cur = cur.var(cx_Oracle.NUMBER)

//     sql = """
//         INSERT INTO club(club_name, club_description)
//         values (:club_name, :club_description)
//         returning club_id into :cur
//     """

//     cur.execute(sql, club_name=club_name, club_description=club_description, cur=club_id_cur)
//     club_id = club_id_cur.getvalue() # Get the newly inserted club_id

//     sql = """
//         INSERT INTO club_tag(club_id, topic_id)
//         values (:club_id, :topic_id)
//     """

//     cur.execute(sql, club_id=club_id[0], topic_id=topic_id) # Use the club_id to add it to the topic table

//     con.commit()
//     close(con, cur)

//     return jsonify(result=True)
