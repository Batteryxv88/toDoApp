import { useContext, useState } from "react";
import "./NewNoteForm.css";
import AppContext from "../Context/AppContext";
import NoteCards from "../NoteCards/NoteCards";

const NewNoteForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

  const ctx = useContext(AppContext);

  const formSubmitHandler = (evt) => {
    evt.preventDefault();

    const noteData = {
      title: enteredTitle,
      description: enteredDescription,
      id: Math.random().toString(),
      isDone: false,
    };
    const data = [...ctx.notes, noteData];
    ctx.setNotes(data);
    props.onSaveNoteData();
    setEnteredTitle("");
    setEnteredDescription("");
  };

  const changeTitleHandler = (evt) => {
    setEnteredTitle(evt.target.value);
  };

  const changeDescriptionHandler = (evt) => {
    setEnteredDescription(evt.target.value);
  };

  return (
    <div className="note-form">
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form__wrapper">
          <input
            autoFocus
            className="form__input form__input_title"
            onChange={changeTitleHandler}
          ></input>
          <textarea
            className="form__input form__input_description"
            onChange={changeDescriptionHandler}
          ></textarea>
        </div>
        <div className="form__wrapper">
          <button className="form__button form__button_submit" type="submit">
            Add note
          </button>
          <button
            className="form__button form__button_cansel"
            onClick={props.onCansel}
          >
            Cansel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewNoteForm;
