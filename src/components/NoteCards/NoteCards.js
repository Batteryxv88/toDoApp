import "./NoteCards.css";
import NoteItem from "./NoteItem";

const NoteCards = (props) => {
  return (
    <div className="note-cards">
      {props.allItems.length <= 0 && <h2 className="no-items">No items</h2>}
      {props.allItems.length >= 1 &&
        props.allItems.map((note) => (
          <NoteItem
            title={note.title}
            description={note.description}
            key={note.id}
            isDone={note.isDone}
            id={note.id}
          />
        ))}
    </div>
  );
};

export default NoteCards;
