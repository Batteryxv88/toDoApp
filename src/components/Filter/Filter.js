import FilterItemLarge from "./FilterItemLarge";
import FilterItemSmall from "./FilterItemSmall";
import AppContext from "../Context/AppContext";
import { useContext, useReducer } from "react";
import NoteCards from "../NoteCards/NoteCards";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const filterReducer = (state, action) => {
  if (action.type === "all") {
    return {
      allItems: action.val,
      activeItems: !state,
      completedItems: !state,
    };
  }
  if (action.type === "active") {
    return {
      activeItems: action.val,
      allItems: !state,
      completedItems: !state,
    };
  }
  if (action.type === "complited") {
    return {
      completedItems: action.val,
      allItems: !state,
      activeItems: !state,
    };
  }
  if (action.type === "clear") {
    return { allItems: true, activeItems: !state, completedItems: !state };
  }
};

const Filter = () => {
  const ctx = useContext(AppContext);

  const [items, dispatchItems] = useReducer(filterReducer, {
    allItems: true,
    activeItems: false,
    completedItems: false,
  });

  const {
    allItems: allItems,
    activeItems: activeItems,
    completedItems: completedItems,
  } = items;

  const leftItems = ctx.notes.filter((val) => {
    const filteredTtems = val.isDone === false;
    return filteredTtems;
  });

  const activeItemsArr = ctx.notes.filter((val) => {
    return val.isDone === false;
  });

  const completedItemsArr = ctx.notes.filter((val) => {
    return val.isDone === true;
  });

  const setAllItemsHandler = () => {
    dispatchItems({ type: "all", val: true });
  };

  const setActiveItemsHandler = () => {
    dispatchItems({ type: "active", val: true });
  };

  const setCompletedItemsHandler = () => {
    dispatchItems({ type: "complited", val: true });
  };

  const clearCompletedHandler = (evt) => {
    const filteredItems = ctx.notes.filter((val) => {
      return val.isDone === false;
    });
    ctx.setNotes(filteredItems);
    dispatchItems({ type: "clear" });

    ctx.notes.forEach((todo) => {
      if (todo.isDone) {
        const docRef = doc(db, "todos", todo.id);
        deleteDoc(docRef);
      }
    });
  };

  return (
    <>
      <FilterItemLarge
        setAllItemsHandler={setAllItemsHandler}
        setActiveItemsHandler={setActiveItemsHandler}
        setCompletedItemsHandler={setCompletedItemsHandler}
        clearCompletedHandler={clearCompletedHandler}
        leftItems={leftItems}
        allItems={allItems}
        completedItems={completedItems}
        activeItems={activeItems}
      />
      <FilterItemSmall
        setAllItemsHandler={setAllItemsHandler}
        setActiveItemsHandler={setActiveItemsHandler}
        setCompletedItemsHandler={setCompletedItemsHandler}
        clearCompletedHandler={clearCompletedHandler}
        leftItems={leftItems}
        allItems={allItems}
        completedItems={completedItems}
        activeItems={activeItems}
      />
      {allItems && <NoteCards allItems={ctx.notes} />}
      {activeItems && <NoteCards allItems={activeItemsArr} />}
      {completedItems && <NoteCards allItems={completedItemsArr} />}
    </>
  );
};

export default Filter;
