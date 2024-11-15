import {NoteModel} from "../model/note";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "react-bootstrap";
import "../style/NotePage.css"
import User from "../model/user";

export async function getLoggedInUser(): Promise<User[]> {
    const res = await fetch("/api/users", {method: "GET"})
    if (!res.ok) {
        throw new Error("Failed to fetch notes");
    }
    const data:User[]=await res.json();
    return data
}

const Note = () => {

    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [addNote, setAddNote] = useState<boolean>(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [edit, setEdit] = useState("")



    // const getNotes = () => {
    //     axios.get("/api/notes/")
    //         .then((response) => {
    //             setNotes(Array.isArray(response.data) ? response.data : []);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             alert("Failed to load notes");
    //         })
    // }

    const getNotes = async (): Promise<void> => {
        try {
            const res = await fetch("/api/notes", {method: "GET"});
            if (!res.ok) {
                throw new Error("Failed to fetch notes");
            }
            const data: NoteModel[] = await res.json();
            setNotes(data); // Set the resolved notes array in state
        } catch (error) {
            console.error("Error fetching notes:", error);
            alert("Failed to load notes");
        }
    };
    useEffect(() => {
        getNotes();
    }, []);
    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const data = {
        title: title,
        text: text
    }

    const createNote = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("/api/notes/", data)
            .then((response) => {
                setNotes(Array.isArray(response.data) ? response.data : []);
                setAddNote(false);
                getNotes();
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to create note");
            })
    }

    const data1 = {
        title: title,
        text: text
    }
    const createEditNote = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.patch("/api/notes/" + edit, data1)
            .then((response) => {
                setNotes(Array.isArray(response.data) ? response.data : []);
                setAddNote(false);
                getNotes();
                setEdit("")
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to create note");
            })
    }

    return (
        <div className="Note">

            <div className="note-button-container">
                <button type="button" className="btn btn-primary m-2" onClick={() => setAddNote(true)}>
                    +Note
                </button>
            </div>

            {
                addNote &&
                <div className={"create-note-container note-form"}>
                    <div className={"d-flex justify-content-center"}>
                        <h2 className={"justify-content-center"}>Create Note</h2>
                    </div>
                    <form onSubmit={createNote}>
                        <div>
                            <b><label className={"form-label"}>Title </label></b>
                            <input type={"text"} className={"form-control"} onChange={handleTitle} value={title}/>
                        </div>
                        <div>
                            <b><label className={"form-label"}>Text</label></b>
                            <input type={"text"} className={"form-control"} onChange={handleText} value={text}/>
                        </div>
                        <button type={"submit"} className={"btn btn-success btn-sm mt-2"}>save</button>
                        <button type={"button"} className={"btn btn-danger btn-sm mt-2"} onClick={() => {
                            setAddNote(false);
                        }}>cansel
                        </button>
                    </form>
                </div>
            }

            {
                edit &&
                <div className={"note-form"}>
                    <div className={"d-flex justify-content-center"}>
                        <h2 className={"justify-content-center"}>Edit Note</h2>
                    </div>
                    <form onSubmit={createEditNote}>
                        <div>
                            <b><label className={"form-label"}>Title </label></b>
                            <input type={"text"} className={"form-control"} onChange={handleTitle} value={title}/>
                        </div>
                        <div>
                            <b><label className={"form-label"}>Text</label></b>
                            <input type={"text"} className={"form-control"} onChange={handleText} value={text}/>
                        </div>
                        <button type={"submit"} className={"btn btn-success btn-sm mb-5"}>update</button>
                        <button type={"button"} className={"btn btn-danger btn-sm mb-5"} onClick={() => {
                            setEdit("");
                        }}>cansel
                        </button>
                    </form>
                </div>
            }

            <div className={"note-container"}>
                {
                    notes && notes.map((note: NoteModel, index) => {
                        return (
                            <div key={index}>
                                <Card border="primary" style={{width: '18rem'}} className="mb-3 note-card note-card">
                                    <Card.Header>NOTE : {index + 1}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{note.title}</Card.Title>
                                        <Card.Text>
                                            {note.text}
                                        </Card.Text>
                                        <button type={"button"} className='btn btn-success btn-sm' onClick={() => {
                                            setEdit(note._id)
                                            setTitle(note.title)
                                            setText(note.text)
                                            setAddNote(false)
                                        }}>Edit
                                        </button>
                                        <button className='btn btn-danger btn-sm ms-2' onClick={() => {
                                            axios.delete("/api/notes/" + note._id)
                                                .then((response) => {
                                                    setNotes(response.data);
                                                    getNotes();
                                                }).catch((error) => {
                                                console.log(error)
                                                alert("Error deleting")
                                            })
                                        }}>Delete
                                        </button>
                                    </Card.Body>
                                    <Card.Footer>
                                        Created at : {new Date(note.createdAt).toLocaleString()} <br/>
                                    </Card.Footer>
                                </Card>
                            </div>
                        )
                    })
                }</div>
        </div>
    )
}
export default Note

