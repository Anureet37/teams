import React from "react";
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {BrowserRouter as Router,Switch,Route}from "react-router-dom";
import Login from "./Login";
// import { actionTypes } from "./reducer";
// import { RestoreOutlined } from "@material-ui/icons";
import { useStateValue } from "./StateProvider";

function App() {
  const [{user},dispatch]=useStateValue();

  return (
    <div className="app">
      {!user?(
        <Login/>):(
      <div className="app__body">
        <Router>
        <Sidebar/>
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat/>
            </Route>
            <Route path="/">
              <div id="head">
              <h1 >Click on room to get messages</h1>
              <img src="data:image/png;base64,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"></img>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
