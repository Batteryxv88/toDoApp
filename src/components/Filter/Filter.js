import FilterItemLarge from "./FilterItemLarge";
import FilterItemSmall from "./FilterItemSmall";
import AppContext from "../Context/AppContext";
import { useContext, useReducer } from "react";
import NoteCards from "../NoteCards/NoteCards";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

/** A function changing the state relative of the filter*/
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

  /** Reducer state of filter
   * @param {array} items
   */
  const [items, dispatchItems] = useReducer(filterReducer, {
    allItems: true,
    activeItems: false,
    completedItems: false,
  });

  /** Distructuring @param items */
  const {
    allItems: allItems,
    activeItems: activeItems,
    completedItems: completedItems,
  } = items;

  /** A function of filtering uncompleted notes*/
  const activeItemsArr = ctx.notes.filter((val) => {
    return val.isDone === false;
  });

  /** A function of filtering completed notes*/
  const completedItemsArr = ctx.notes.filter((val) => {
    return val.isDone === true;
  });

  /** Change state handler, filtered all notes*/
  const setAllItemsHandler = () => {
    dispatchItems({ type: "all", val: true });
  };

  /** Change state handler, filtered active notes*/
  const setActiveItemsHandler = () => {
    dispatchItems({ type: "active", val: true });
  };

/** Change state handler, filtered completed notes*/
  const setCompletedItemsHandler = () => {
    dispatchItems({ type: "complited", val: true });
  };

  /** Clear completed notes handler. Setting the local state relative 
  * of filtered notes, sending changes to the firebase.
  */
  const clearCompletedHandler = () => {
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
        leftItems={activeItemsArr}
        allItems={allItems}
        completedItems={completedItems}
        activeItems={activeItems}
      />
      <FilterItemSmall
        setAllItemsHandler={setAllItemsHandler}
        setActiveItemsHandler={setActiveItemsHandler}
        setCompletedItemsHandler={setCompletedItemsHandler}
        clearCompletedHandler={clearCompletedHandler}
        leftItems={activeItemsArr}
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
