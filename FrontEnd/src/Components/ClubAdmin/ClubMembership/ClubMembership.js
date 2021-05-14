import React from "react";
import "./ClubMembership.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getClubMembers } from "../../../Common/Services/MembershipService";

const ClubMembers = (props) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getClubMembers(props.clubId).then(response => response.json()).then(data => {
        console.log("HELLO")
        console.log(data)
        console.log("HELLO")
        setMembers(data)
    })
  }, [props.clubId]);
    
  return (
    <div >
      <h3>Manage Members</h3>

    </div>
  );
};

export default ClubMembers;

/*
      {members.map((member) => (
          <Member
            key={member.member_id}
            member_id={member.member_id}
            member_text={member.member_text}
          />
        ))}
*/