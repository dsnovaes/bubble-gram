import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Explore from "./components/Explore";
import ShowPage from "./components/ShowPage"

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/posts">
            <Explore />
          </Route>
          <Route path="/posts/:postId">
            <ShowPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;