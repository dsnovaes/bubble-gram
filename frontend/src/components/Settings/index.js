import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Settings() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <p>Logged in</p>
    );
  } else {
    sessionLinks = (
        <p>Logged out</p>
    );
  }

  return (
    <>
        <p>Settings for {sessionUser.username}</p>
        {sessionLinks}
    </>
  );
}

export default Settings;