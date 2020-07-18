import React, { useRef, forwardRef } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import onError from "../libs/errorLib";
import { Modal, Button } from "react-bootstrap";

const NoteModal = (props, editedNoteRef) => {
  const newNoteRef = useRef("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const noteToSave = newNoteRef.current.value;
      await createNote({ content: noteToSave });
      props.setDisplay(false);
      props.updateNewNoteTracker(!props.newNoteTracker);
      props.history.push("/");
      console.log("should have reloaded");
    } catch (e) {
      onError(e);
    }
  }

  function createNote(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  function returnSaveEventHandler(event) {
    if (props.modalType === "Create") {
      return handleSubmit(event);
    } else if (props.modalType === "Edit") {
      return handleSave(event);
    }
    return null;
  }

  async function handleSave(event) {
    event.preventDefault();
    const noteToSave = editedNoteRef.current.value;
    try {
      await saveNote({ content: noteToSave });
      props.setDisplay(false);
      props.setCardContent(noteToSave);
    } catch (error) {
      onError(error);
    }
  }

  const saveNote = note => {
    return API.put("notes", `/notes/${props.noteId}`, {
      body: note
    });
  };

  const handleCancel = () => props.setDisplay(false);

  return (
    <Modal show={props.display} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          ref={editedNoteRef === null ? newNoteRef : editedNoteRef}
          defaultValue={
            props.cardContent === undefined ? "" : props.cardContent
          }
          id="note-dialog"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={returnSaveEventHandler}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default forwardRef(NoteModal);
