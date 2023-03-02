import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Home";
import { UserContextProvider } from "./User";


function App() {
  document.title = 'InSocial';

  return (
    <UserContextProvider>
        <div className="App">
            <Home />
         </div>
    </UserContextProvider>
  );
};

export default App;