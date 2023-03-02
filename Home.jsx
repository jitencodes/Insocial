import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import Feed from './Feed';
import Profile from "./Profile";

function Home() {
    const user = useSelector(selectUser);

  return (
    <div className="home">
      <Router>
        <Switch>
          
          <Route exact path="/">
              <Navbar />
              <Feed />
          </Route>
          
          <Route path="/:username/:uid">
              <Navbar />
              <Profile />
          </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default Home;
