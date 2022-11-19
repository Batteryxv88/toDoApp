import "./NoteItem.css";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

var _ = require("lodash");

const NoteItem = (props) => {
  const [isDetailedCard, setIsDetaildCard] = useState(false);

  const ctx = useContext(AppContext);

  const showDetailshandler = () => {
    setIsDetaildCard(!isDetailedCard);
  };

  const noteDoneHandler = (evt) => {
    const rex = _.cloneDeep(ctx.notes);

    rex.map((note) => {
      if (note.id === props.id) {
        return (note.isDone = !note.isDone);
      } else {
        return (note.isDone = note.isDone);
      }
    });

    ctx.setNotes(rex);

    const todoRef = doc(db, "todos", props.id);
    updateDoc(todoRef, {
      isDone: !props.isDone,
    });
  };

  return (
    <div className="card">
      {props.isDone && (
        <div className="card__is-done" onClick={noteDoneHandler}></div>
      )}
      {!props.isDone && (
        <div className="card__not-done" onClick={noteDoneHandler}></div>
      )}
      <>
        {!isDetailedCard && (
          <h2 className="card__title" onClick={showDetailshandler}>
            {props.title}
          </h2>
          
        )}
        {isDetailedCard && (
          <div className="card__wrapper">
            <h2 className="card__title" onClick={showDetailshandler}>
              {props.title}
            </h2>
            <h3 className="card__description">{props.description}</h3>
          </div>
        )}
      </>
    </div>
  );
};

export default NoteItem;
