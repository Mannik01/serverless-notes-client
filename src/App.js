import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import { AppContext } from "./libs/contextLib";
import onError from "./libs/errorLib";
import Routes from "./Routes";
import NoteModal from "../src/components/Modal";
import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [display, setDisplay] = useState(false);
  const history = useHistory();
  const newNoteRef = useRef("");
  const [newNoteTracker, updateNewNoteTracker] = useState(false);

  useEffect(() => {
    onLoad();
  }, [newNoteTracker]);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  function handleCreateNote() {
    setDisplay(true);
    setTimeout(() => {
      newNoteRef.current.focus();
    }, 500);
  }

  function getModalProps() {
    return {
      display,
      setDisplay,
      modalType: "Create",
      history,
      newNoteTracker,
      updateNewNoteTracker
    };
  }

  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <>
                  <NavItem onClick={handleCreateNote}>Create</NavItem>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={{
            isAuthenticated,
            userHasAuthenticated,
            newNoteTracker,
            updateNewNoteTracker
          }}
        >
          <Routes />
          <NoteModal {...getModalProps()} ref={newNoteRef} />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
