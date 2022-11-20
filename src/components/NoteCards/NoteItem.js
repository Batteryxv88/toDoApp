import "./NoteItem.css";
import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import dayjs from "dayjs";

const NoteItem = (props) => {

  /** State for open close detail information of notes*/
  const [isDetailedCard, setIsDetaildCard] = useState(false);

  /** Toggle state */
  const showDetailshandler = () => {
    setIsDetaildCard(!isDetailedCard);
  };

  /** Sending update isDone key to firebase */
  const noteDoneHandler = () => {
    const todoRef = doc(db, "todos", props.id);
    updateDoc(todoRef, {
      isDone: !props.isDone,
    });
  };

  console.log(dayjs().format())

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
