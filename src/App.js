import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import './style.css';

export default function App() {

    const [notes, setNotes] = React.useState(
        fetch('')
        || []); // load db here. If its empty would it be undefined? can i make the notes column have an array on default or is the first option better 
    const [currentNoteId, setCurrentNoteId] = React.useState((notes[0] && notes[0].id) || "");
    const [route, setRoute] = React.useState("signIn");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onNameSubmit(e) {
        setName(e.target.value)
    }

    function onEmailSubmit(e) {
        setEmail(e.target.value)
    }

    function onPasswordSubmit(e) {
        setPassword(e.target.value)
    }

    function onRouteChange(args) {
        setRoute(args)
    }

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "Type your note's title here"
        }

        setNotes(prevNotes => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    }

    React.useEffect(() => {
        fetch('http://localhost:3000/updatestate', {
						method: 'post',
						headers: {'Content-Type':'application/json'},
						body: JSON.stringify({
							email: email,
                            notes: notes
								})
							})
								.then(response => response.json())
								.then(data => {
                                    console.log(data)
								})
        //localStorage.setItem('key', JSON.stringify(notes))
    }, [notes]) // every time notes state changes on update or reload change the info in storage.

    function updateNote(text) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))

        setNotes(prev => {
            var newArr = [];
            for (let thing of prev) {
                if (thing.id === currentNoteId) {
                    newArr.unshift({ ...thing, body: text })
                } else {
                    newArr.push(thing)
                }
            }
            return newArr
        })

    }

    function deleteNote(e, noteId) {
        e.stopPropagation();
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    function loadUserInfo(data) {
        setNotes(data.notes)
        setEmail(data.notes)
        setName(data.notes)
    }

    function onRegister() {
        fetch('http://localhost:3000/register', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.email){
            loadUserInfo(data);
            onRouteChange('home');
          }
        }) 
      }

      function onSignIn() {
        fetch('http://localhost:3000/signin', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.email){
            loadUserInfo(data);
            onRouteChange('home');
          }
        }) 
      }


    return (
        <div>
            {route === 'home'
                ? <main>
                    {
                        notes.length > 0
                            ?
                            <Split
                                sizes={[30, 70]}
                                direction="horizontal"
                                className="split"
                            >
                                <Sidebar
                                    notes={notes}
                                    currentNote={findCurrentNote()}
                                    setCurrentNoteId={setCurrentNoteId}
                                    newNote={createNewNote}
                                    deleteNote={deleteNote}
                                />
                                {
                                    currentNoteId &&
                                    notes.length > 0 &&
                                    <Editor
                                        currentNote={findCurrentNote()}
                                        updateNote={updateNote}
                                    />
                                }
                            </Split>
                            :
                            <div className="no-notes">
                                <h1>You have no notes</h1>
                                <button className="first-note" onClick={createNewNote}>Create one now</button>
                            </div>
                    }
                </main>
                : (
                    route === 'signIn'
                        ? <main className="pa4 black-80">
                            <form className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={onEmailSubmit} className="pa2 input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address" />
                                </div>
                                <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={onPasswordSubmit} className="b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password" />
                                </div>
                            </fieldset>
                            <div className="">
                                <input onClick={onSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                            </div>
                            <div className="lh-copy mt3">
                                <p>Don't have an account?</p>
                                <a href="#0" onClick={() => onRouteChange('register')} className="f6 link dim black underline db">Sign up</a>
                            </div>
                            </form>
                        </main>
                        : <main className="pa4 black-80">
                        <form className="measure center">
                          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mv3">
                              <label className="db fw6 lh-copy f6" htmlFor="name">What's your name?</label>
                              <input onChange={onNameSubmit} className="b pa2 input-reset ba bg-transparent w-100" type="text" name="name"  id="name" />
                            </div>
                            <div className="mt3">
                              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                              <input onChange={onEmailSubmit} className="pa2 input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                              <input onChange={onPasswordSubmit} className="b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password" />
                            </div>
                          </fieldset>
                          <div className="">
                            <input onClick={onRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                          </div>
                        </form>
                      </main>
                )
            }
        </div>
    )
}
