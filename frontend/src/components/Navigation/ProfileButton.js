import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { FaUserAlt } from 'react-icons/fa'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="relative">
      <button onClick={openMenu} className="profileButton">
        <FaUserAlt /> <span>{user.username}</span>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
            <li><a href={`/${user.username}`}>Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a onClick={logout}>Log Out</a></li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;