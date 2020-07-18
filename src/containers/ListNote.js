import React, { useState, useRef } from "react";
import { API } from "aws-amplify";
import onError from "../libs/errorLib";
import NoteModal from "../components/Modal";
import "./ListNote.css";

export default function ListNote(props) {
  const noteCardRef = useRef(null);
  const editedNoteRef = useRef("");
  const [cardContent, setCardContent] = useState(props.note.content.trim());
  const [display, setDisplay] = useState(false);
  const noteId = props.note.noteId;

  const handleOpen = event => {
    event.preventDefault();
    setDisplay(true);
    setTimeout(() => {
      const noteLength = editedNoteRef.current.value.length;
      editedNoteRef.current.focus();
      editedNoteRef.current.setSelectionRange(noteLength, noteLength);
    }, 500);
  };

  async function handleDelete(event) {
    event.preventDefault();
    try {
      await deleteNote();
      noteCardRef.current.style.display = "none";
      setDisplay(false);
    } catch (error) {
      onError(error);
    }
  }

  const deleteNote = () => {
    return API.del("notes", `/notes/${noteId}`);
  };

  function getModalProps() {
    return {
      cardContent,
      setCardContent,
      noteId,
      display,
      setDisplay,
      modalType: "Edit"
    };
  }

  return (
    <div className="note-card" ref={noteCardRef}>
      <h3>{cardContent}</h3>
      <div id="action-bar">
        <div onClick={handleOpen}>
          <img
            alt="editIcon"
            className="note-edit"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAgUlEQVRIie2QSwqAIBQAp89t6jhBdJpcdpAWecYCW/QKF2ogz50DDxcPZlSoPBhgKyl3MuqRETi9gJOgCo2ccyrSZsoNcAA9YIEFuLy9y/R+8vemViIAE89LVi35OzvQyX7QlvuR3O/+lTsKfEuVV3mcovJUQEUeC6jJQwFVeSXIDYwzcsP9Xn3mAAAAAElFTkSuQmCC"
          />
        </div>
        <div onClick={handleDelete}>
          <img
            alt="deleteIcon"
            className="note-delete"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAjklEQVRIie2Vyw2AIBQER3uQaIlarhwsRy+Y4AfCPuTmnEx0dwg+FH4MzIAz5FzIZlmAHfCixIXMHjqSDMAaHtyAqaD8nhnVQE4ilysSc3mJpLo8J/ms/CSeEH+7tozzK/GqpZX3FdKuInuh6Ra9vVDLYSwuT92TJSWjaJYocy5LLIdIkjT/XEPjH87PgwNng1K28QMLlAAAAABJRU5ErkJggg=="
          />
        </div>
      </div>
      <NoteModal {...getModalProps()} ref={editedNoteRef} />
    </div>
  );
}
