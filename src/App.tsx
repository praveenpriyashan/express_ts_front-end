import './App.css';
import Note from "./component/Note";
import User from "./component/User";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

    return (
        <div className="App top">
            <BrowserRouter>
               <Routes>
                  <Route path={'api/notes'} element={<Note/>}/>
                   <Route path={'api/users'} element={<User/>}/>
               </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
