import React, { useState } from "react";
// import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import {updateUser} from "../../store/users"
import Header from "../Header"
import "./Settings.css"

function Settings() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState(sessionUser.email);
  const [username, setUsername] = useState(sessionUser.username);
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [name, setName] = useState(sessionUser.name);
  const [bio, setBio] = useState(sessionUser.bio);
  const [privateProfile, setPrivateProfile] = useState(sessionUser.private_profile);
  const [errors, setErrors] = useState([]);

  let user = {
    email,
    name,
    username,
    password,
    profilePicture,
    privateProfile,
    bio
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    setErrors([]);
    dispatch(updateUser(user))
    .catch(async (res) => {
      let data;
      try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
      } catch {
          data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  if (sessionUser) {
    return (
      <div className="container">
          <Header />
          <section className="signup settings">
              <div className="loginOrSignUp">
                <h1>Settings</h1>
                <form onSubmit={handleSubmit}>
                  <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                  </ul>
                  <label htmlFor="profilePicture">Upload a profile picture</label>
                    <input
                      type="file"
                      name="profilePicture"
                      value={profilePicture}
                      onChange={(e) => setProfilePicture(e.target.value)}
                      placeholder="Choose a file in your computer"
                    />

                  <label htmlFor="email">Change your email</label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                  <label htmlFor="username">Change your username</label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Pick a username"
                      required
                    />
                  <label htmlFor="name">Change your name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First and last name"
                      required
                    />
                  <label htmlFor="bio">Edit your bio <em>(optional)</em></label>
                    <textarea name="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio">{bio}</textarea>
                  <label>
                    <input type="checkbox" checked={privateProfile} name="privateProfile" value={privateProfile} onChange={() => setPrivateProfile(!privateProfile)} /> 
                    <div>
                      Private Profile <em>(only those who follow you can see your posts)</em>
                    </div>
                  </label>
                  <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password (min. 6 characters)"

                    />
                  <button type="submit">Save</button>
                </form>
          </div>
        </section>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }


}

export default Settings;