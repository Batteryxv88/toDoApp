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

  const date = new Date(props.date)
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();
  


  return (
    <div className="card">
      {props.isDone && (
        <div className="card__is-done" onClick={noteDoneHandler}></div>
      )}
      {!props.isDone && (
        <div className="card__not-done" onClick={noteDoneHandler}></div>
      )}
      <>
        <div className="card__box">
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
        </div>
        <div className="card__date">
          <div className="card__date_month">{month}</div>
          <div className="card__date_year">{year}</div>
          <div className="card__date_day">{day}</div>
        </div>
      </>
    </div>
  );
};

export default NoteItem;
