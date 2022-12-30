import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Settings() {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return (
      <>
          <p>Settings for {sessionUser.username}</p>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }


}

export default Settings;