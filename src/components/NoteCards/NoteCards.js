import "./NoteCards.css";
import NoteItem from "./NoteItem";
import download from "../UI/Images/download2.png"

const NoteCards = (props) => {

  return (
    <div className="note-cards">
      {props.allItems.length <= 0 && <h2 className="no-items">No items</h2>}
      {props.allItems[0] === 12 && <img src={download} className="download"></img>}
      {props.allItems.length >= 1 && props.allItems[0] !== 12 &&
        props.allItems.map((note) => (
          <NoteItem
            title={note.title}
            description={note.description}
            key={note.id}
            isDone={note.isDone}
            id={note.id}
            date={note.date}
          />
        ))}
    </div>
  );
};

export default NoteCards;
