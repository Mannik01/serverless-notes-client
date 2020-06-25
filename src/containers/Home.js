import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import { API } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import onError from "../libs/errorLib";
import ListNote from "./ListNote";
import "./Home.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) return;

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0 ? (
          // <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          //   <ListGroupItem header={note.content.trim().split("\n")[0]}>
          //     {"Created: " + new Date(note.createdAt).toLocaleString()}
          //   </ListGroupItem>
          // </LinkContainer>
          <ListNote key={note.noteId} note={note} />
        ) : null
      // <LinkContainer key="new" to="/notes/new">
      //   <div class="addNote">
      //     <h4>{"\uFF0B"}</h4>
      //   </div>
      // </LinkContainer>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotesList(notes) : renderLander()}
    </div>
  );
}
