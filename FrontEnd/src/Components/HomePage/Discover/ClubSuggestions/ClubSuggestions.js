// import { useEffect, useState } from "react";
// import { getSuggested } from "../../../../Common/Services/UserService";
// import ClubSubscribe from "./ClubSubscribe";
import "./ClubSuggestions.css";

//STATEFUL PARENT COMPONENT
const ClubSuggestions = () => {
  // //set up the state
  // const [topics, setTopics] = useState([]);

  //useEffect to run when the page loads to obtain async data
  // useEffect(() => {
  //   fetch("/clubTopic", {
  //     headers : { 
  //       redirect: 'follow',
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }}).then(response => {
  //     console.log(response);
  //     response.json()
  //   })
  //     .then(data => {
  //       console.log(data);
  //       // setTopics(data.topics)
  //   });
  // }, [topics]);

  return (
    <div className="suggestions-container">
      <h1 className="title">Cool Clubs</h1>
      <ul className="club-suggestions-list">
        {/* {topics.map((topic) => {
          (
            <ClubSubscribe
              key={topic.id}
              description={topic.description}
            />
          );
        })} */}
      </ul>
    </div>
  );
};

export default ClubSuggestions;
