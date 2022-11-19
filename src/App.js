import "./App.css";
import NewNote from "./components/NewNote/NewNote";
import { useState, useEffect } from "react";
import AppContext from "./components/Context/AppContext";
import Filter from "./components/Filter/Filter";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getTodos = () => {
      const colRef = collection(db, "todos");
      onSnapshot(colRef, (snapshort) => {
        const arr = [];
        snapshort.docs.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
          setNotes(arr);
        });
      });
    };
    getTodos();
  }, []);


  const addNoteHandler = (notes) => {
    setNotes((prevNotes) => {
      return [notes, ...prevNotes];
    });
  };

  return (
    <AppContext.Provider value={{ notes, setNotes }}>
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">To do list</h1>
        </header>
        <main className="App__main">
          <NewNote onAddNote={addNoteHandler} />
          <Filter />
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
