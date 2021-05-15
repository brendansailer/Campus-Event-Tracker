import React from "react";
import "./Announcement.css";
//import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteAnnouncement, modifyAnnouncement } from "../../../Common/Services/AnnouncementService";
import { Modal, Button} from 'react-bootstrap';
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import {ButtonGroup} from 'react-bootstrap';

export default function Announcement(props) {
  const [show, setShow] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [announcementDescription, setAnnouncementDescription] = useState();

  function deleteAnnouncementHandler(e) {
    e.preventDefault();
    console.log(deleteAnnouncement(props.announcement_id));
    setShow(true);
  }

  function modifyAnnouncementHandler(e) {
    e.preventDefault();
    setShowModifyModal(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    modifyAnnouncement(announcementDescription, props.announcement_id).then((value) => {
        console.log(value);
        handleClose();
      });
  }

  const handleClose = () => setShowModifyModal(false);

  return (
    <div className={show ? 'hidden' : 'announcement'}>
      <Modal show={showModifyModal} onHide={handleClose}>
        <ModalHeader className="modal-header" closeButton>
          <ModalTitle>Edit Announcement</ModalTitle>
        </ModalHeader>
        <ModalBody>Announcement Text: 
          <input
            name='sample'
            type='text'
            onChange={e => setAnnouncementDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
      <div className="announcement-info">
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-danger" size="sm" onClick={deleteAnnouncementHandler}>DELETE</Button>
          <Button variant="outline-success" size="sm" onClick={modifyAnnouncementHandler}>MODIFY</Button>
        </ButtonGroup>
      </div>
      <p className="event-text">{props.announcement_text}</p>
    </div>
  );
}
