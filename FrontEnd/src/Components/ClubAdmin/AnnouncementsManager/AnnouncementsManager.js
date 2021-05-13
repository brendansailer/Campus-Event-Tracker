import React from "react";
import "./AnnouncementsManager.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getClubAnnouncements } from "../../../Common/Services/AnnouncementService";
import Announcement from "./Announcement";

const AnnouncementsManager = (props) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getClubAnnouncements(props.clubId).then(response => response.json()).then(data => {
        console.log(data)
        setAnnouncements(data)
    })
  }, [props.clubId]);
    
  return (
    <div className="announcements-container">
      <h3>Manage Announcements</h3>
      {announcements.map((announcement) => (
          <Announcement
            key={announcement.announcement_id}
            announcement_id={announcement.announcement_id}
            announcement_text={announcement.announcement_text}
          />
        ))}
    </div>
  );
};

export default AnnouncementsManager;

/*
        {announcements.map((announcement) => (
          <Announcement
            key={announcement.announcement_id}
          />
        ))}
*/