import "./Filter.css";
import AppContext from "../Context/AppContext";
import { useContext, useState, useReducer } from "react";
import NoteCards from "../NoteCards/NoteCards";

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

  const clearCompletedHandler = () => {
    const filteredItems = ctx.notes.filter((val) => {
      return val.isDone === false;
    });

    ctx.setNotes(filteredItems);
    dispatchItems({ type: "clear" });
  };

  return (
    <>
      <div className="filter">
        <p className="filter__left-notes">
          {leftItems.length >= 1 ? leftItems.length : "No"} items left
        </p>
        <div className="filter__wrapper">
          <p
            className={`filter__filter filter__all ${
              allItems && "filter__current"
            }`}
            onClick={setAllItemsHandler}
          >
            All
          </p>
          <p
            className={`filter__filter filter__active ${
              activeItems && "filter__current"
            }`}
            onClick={setActiveItemsHandler}
          >
            Active
          </p>
          <p
            className={`filter__filter filter__completed ${
              completedItems && "filter__current"
            }`}
            onClick={setCompletedItemsHandler}
          >
            Completed
          </p>
        </div>
        <p className="filter__clear-complete" onClick={clearCompletedHandler}>
          Clear completed
        </p>
      </div>
      {allItems && <NoteCards allItems={ctx.notes} />}
      {activeItems && <NoteCards allItems={activeItemsArr} />}
      {completedItems && <NoteCards allItems={completedItemsArr} />}
    </>
  );
};

export default Filter;
