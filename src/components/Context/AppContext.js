import React from "react";

const notes = [];

const AppContext = React.createContext({
  notes: notes,
});

export default AppContext;
