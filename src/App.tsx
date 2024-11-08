import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {Note} from "./model/note";

function App() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        axios.get("/api/notes/")
            .then((response) => {
                setNotes(response.data);
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to load notes");
            })
    }, []);
    return (
        <div className="App">
            {
                notes && notes.map((note: Note, index) => {
                    return (
                        <div key={index}>
                            {note.title} - {note.text}
                            <button type="button" className="btn btn-primary btn-sm">Edit</button>
                            <button type="button" className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default App;
