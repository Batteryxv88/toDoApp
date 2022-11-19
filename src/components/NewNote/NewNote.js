import "./NewNote.css";
import { useState } from "react";
import NewNoteForm from "./NewNoteForm";

const NewNote = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const startAddNoteHandler = () => {
    setIsEditing(true);
  };

  const stopAddNewNote = () => {
    setIsEditing(false);
  };

  const saveNoteDataHandler = () => {
    setIsEditing(false);
  };

  return (
    <section className="new-note">
      {!isEditing && (
        <button className="new-note__button" onClick={startAddNoteHandler}>
          Add new note
        </button>
      )}
      {isEditing && (
        <NewNoteForm
          onCansel={stopAddNewNote}
          onSaveNoteData={saveNoteDataHandler}
        />
      )}
    </section>
  );
};

export default NewNote;
