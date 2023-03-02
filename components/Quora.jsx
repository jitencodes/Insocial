import React from "react";
import CreatePost from "../CreatePost";
// import Feed from "./Feed.js";
import Home from "../Home"
import QHeader from "../components/QHeader";
import "./Quora.css";
// import Sidebar from "./Sidebar";
// import Widget from "./Widget.js";

function Quora() {
  return (
    <div className="quora">
      <QHeader />
      <CreatePost />
      {/* <div className="quora__content">
        <Sidebar />
        <Feed />
        <Widget />
      </div> */}
    </div>
  );
}

export default Quora;