import React from "react";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

export default function NotesPage(props) {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState(null);

  React.useEffect(() => {
    if (!props.userInfo || !props.userInfo.email) {
      return;
    }

    fetch(`http://localhost:3000/getnotes?email=${props.userInfo.email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        if (data.length) {
          setCurrentNoteId(data[0].id);
        }
      });

    //localStorage.setItem('key', JSON.stringify(notes))
  }, [props.userInfo]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      note: "Type your note's title here",
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  async function updateNote(text, id) {
    const resp = await fetch("http://localhost:3000/savenote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        note: text,
        id: id,
        email: props.userInfo.email,
      }),
    });

    const data = await resp.json();

    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === data.id ? data : oldNote;
      })
    );

    setNotes((prev) => {
      var newArr = [];
      for (let thing of prev) {
        if (thing.id === currentNoteId) {
          newArr.unshift({ ...thing, body: text });
        } else {
          newArr.push(thing);
        }
      }
      return newArr;
    });
  }

  async function deleteNote(e, noteId) {
    e.stopPropagation();
    const resp = await fetch("http://localhost:3000/deletenote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: noteId,
      }),
    });

    await resp.json();

    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
    if (newNotes.length) {
      setCurrentNoteId(newNotes[0].id);
    }
  }

  const currentNote = notes.find((note) => {
    return note.id === currentNoteId;
  });

  return (
    <main>
      {!props.userInfo || !props.userInfo.email ? (
        <div className="no-notes">
          <h1>You have not logged in yet</h1>
          <Link to="/" className="first-note" onClick={createNewNote}>
            Login in to continue
          </Link>
        </div>
      ) : notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNoteId={currentNoteId}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />

          {currentNote && (
            <Editor currentNote={currentNote} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
