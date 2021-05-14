import React from "react";
import "./ClubMembership.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getClubMembers } from "../../../Common/Services/MembershipService";
import Member from "./Member";

const ClubMembers = (props) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getClubMembers(props.clubId).then(response => response.json()).then(data => {
        setMembers(data)
    })
  }, [props.clubId]);
    
  return (
    <div className="membership-discover-container">
      <h3>Manage Members</h3>
      {members.map((member) => (
          <Member
            key={member.user_id}
            member_id={member.user_id}
            member_username={member.username}
            member_rank={member.rank}
            club_id={props.clubId}
            dbUser={props.dbUser}
          />
        ))}
    </div>
  );
};

export default ClubMembers;