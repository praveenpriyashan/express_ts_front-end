import './App.css';
import Note from "./component/Note";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {

    return (
        <div className="App top">
            <BrowserRouter>
               <Routes>
                  <Route path={'api/notes'} element={<Note/>}/>
               </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
