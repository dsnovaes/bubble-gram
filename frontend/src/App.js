import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Explore from "./components/Explore";
import ShowPage from "./components/ShowPage"
import Feed from "./components/Feed"
import Create from "./components/Create"
import UserPage from "./components/UserPage"
import Settings from "./components/Settings"
import Page404 from "./components/Page404";


function App() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <>
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/posts">
            <Explore />
          </Route>
          <Route path="/posts/:postId">
            <ShowPage />
          </Route>
          <Route path="/users/:username">
            <UserPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          { sessionUser ? 
          <Route exact path="/">
            <Feed />
          </Route>
          :
          <Route exact path="/">
            <LoginFormPage />
          </Route>
          }
          <Route path="/error" component={Page404}/>
          <Redirect to="/error"/>
        </Switch>
    </>
  );
}

export default App;