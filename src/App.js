import "./App.css";
import NewNote from "./components/NewNote/NewNote";
import { useState, useEffect } from "react";
import AppContext from "./components/Context/AppContext";
import Filter from "./components/Filter/Filter";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

/** @module App */

function App() {
  /** Todos array state
   * @param {array} notes - array todos
   */

  const [notes, setNotes] = useState([]);

  /** Automatic receive array and set to state @param notes */

  useEffect(() => {
    const getTodos = () => {
      const colRef = collection(db, "todos");
      setNotes([12]);
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


  return (
    <AppContext.Provider value={{ notes, setNotes }}>
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">To do list</h1>
        </header>
        <main className="App__main">
          <NewNote />
          <Filter />
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
