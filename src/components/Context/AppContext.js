import React from "react";

const notesData = [
  {
    id: "a1",
    title: "By new keyboard",
    description: "By keyboard on Citilink store",
    done: false,
  },
  {
    id: "a2",
    title: "Clean a room",
    description: "Clean a room",
    isDone: false,
  },
];

const AppContext = React.createContext({
  notes: notesData,
});

export default AppContext;
