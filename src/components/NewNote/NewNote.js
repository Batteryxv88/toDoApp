import "./NewNote.css";
import { useState } from "react";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  /** State for open close adding form*/
  const [isAdding, setIsAdding] = useState(false);

  /** Set state to true (open form) */
  const startAddNoteHandler = () => {
    setIsAdding(true);
  };

  /** Set state to false (close form) */
  const stopAddNewNote = () => {
    setIsAdding(false);
  };

  return (
    <section className="new-note">
      {!isAdding && (
        <button className="new-note__button" onClick={startAddNoteHandler}>
          Add new note
        </button>
      )}
      {isAdding && <NewNoteForm onCansel={stopAddNewNote} />}
    </section>
  );
};

export default NewNote;
