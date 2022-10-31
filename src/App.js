import "./App.css";
import NewNote from "./components/NewNote/NewNote";
import { useState, useEffect } from "react";
import AppContext from "./components/Context/AppContext";
import Filter from "./components/Filter/Filter";

const notesData = [
  {
    id: "a1",
    title: "By new keyboard",
    description: "By keyboard on Citilink store",
    isDone: false,
  },
  {
    id: "a2",
    title: "Clean a room",
    description: "Clean a room",
    isDone: false,
  },
];

function App() {
  const [notes, setNotes] = useState(notesData);

  const addNoteHandler = (notes) => {
    setNotes((prevNotes) => {
      return [notes, ...prevNotes];
    });
  };

  return (
    <AppContext.Provider value={{ notes, setNotes }}>
      <div className="App">
        <h1 className="App__title">To do list</h1>
        <NewNote onAddNote={addNoteHandler} />
        <Filter />
      </div>
    </AppContext.Provider>
  );
}

export default App;
