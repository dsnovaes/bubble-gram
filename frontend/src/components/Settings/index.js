import csrfFetch from '../../store/csrf';
import React, { useEffect, useState } from "react";
// import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useHistory } from 'react-router-dom';
import {updateUser} from "../../store/users"
import Header from "../Header"
import "./Settings.css"
import {deleteProfilePicture} from "../../store/users"
import {storeCurrentUser,setCurrentUser} from "../../store/session"

function Settings() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState(sessionUser.email);
  const [username, setUsername] = useState(sessionUser.username);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(sessionUser.name);
  const [bio, setBio] = useState(sessionUser.bio);
  const [privateProfile, setPrivateProfile] = useState(sessionUser.private_profile);
  const [errors, setErrors] = useState([]);
  const [tab,setTab] = useState("profilePicture")
  const [profilePicture, setProfilePicture] = useState(sessionUser.profilePictureUrl);
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState("");
  const [hasSelectedPhoto,setHasSelectedPhoto] = useState(false);
  const [hasUploadedPhoto,setHasUploadedPhoto] = useState(false);
  const [personalInfoFormReady,setPersonalInfoFormReady] = useState(false);
  const [uploadBtnLabel,setUploadBtnLabel] = useState("Upload");
  const [saveBtnLabel,setSaveBtnLabel] = useState("Save");
  const history = useHistory();

  const demoUser = sessionUser.id===1

  useEffect(()=>{
      if (newProfilePicture!=="") {
          setHasSelectedPhoto(true)
      } else {
          setHasSelectedPhoto(false)
      }
  },[newProfilePicture])

  useEffect(()=>{
    setNewProfilePictureUrl("")
  },[hasUploadedPhoto])

  useEffect(()=>{
      if (email && name && username) {
          setPersonalInfoFormReady(true)
      } else {
          setPersonalInfoFormReady(false)
      }
  },[email,name,username])


  const handleSubmit = async e => {
    e.preventDefault();
    if (tab==="profilePicture") {
      setUploadBtnLabel("Uploading...")
      const formData = new FormData();
      setErrors([]);
      if (newProfilePicture) {
        formData.append('user[profile_picture]', newProfilePicture);
      }
      const response = await csrfFetch(`/api/users/${sessionUser.id}`, {
        method: 'PUT',
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
        setNewProfilePicture("")
        setHasUploadedPhoto(true)
        setUploadBtnLabel("Upload")
        history.push(`/users/${sessionUser.username}`)
      }

    } else if (tab==="personalInfo") {
      setSaveBtnLabel("Saving")
      
      let newEmail = email
      if (demoUser) {
        if (newEmail !== "demo@user.io") { alert("The email of the demo user must remain demo@user.io") }
        newEmail = "demo@user.io"
      }
      let user = {
        id: sessionUser.id,
        email: newEmail,
        name,
        username,
        bio
      }
      dispatch(updateUser(user)).then(()=>{
        setSaveBtnLabel("Save")
        storeCurrentUser(user);
        dispatch(setCurrentUser(user));
        history.push(`/users/${username}`)
      })


    } else if (tab==="password") {
      if (demoUser) {
        alert("Not allowed to change the password of the demo user")
      } else {
      setSaveBtnLabel("Saving")
      let user = {
        id: sessionUser.id,
        email: sessionUser.email,
        name: sessionUser.name,
        username: sessionUser.username,
        password: newPassword
      }
      dispatch(updateUser(user)).then(()=>{
        setSaveBtnLabel("Save")
        storeCurrentUser(user);
        dispatch(setCurrentUser(user));
        history.push(`/users/${sessionUser.username}`)
      })
    }

    }
  }


  const handleFile = e => {
      const file = e.currentTarget.files[0];
      if (file) {
          setHasSelectedPhoto(true)
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            setNewProfilePicture(file);
            setNewProfilePictureUrl(fileReader.result);
          };
      }
  }

  const handleDeleteProfilePicture = e => {
      e.preventDefault();
      if (window.confirm("Are you sure you want to delete your profile picture?")) {
        dispatch(deleteProfilePicture(sessionUser)).then(()=>{
          setNewProfilePicture("");
          setNewProfilePictureUrl("");
        })
      }
  }
  
  const changeTab = (selectedTab) => {
    if (selectedTab!=="profilePicture") {
      setNewProfilePicture("")
      setNewProfilePictureUrl(null)
    };
    setTab(selectedTab)
  }

  if (sessionUser) {
    return (
      <div className="container">
          <Header />
          <section className="settings">
              <div className="innerSettings">
                <h1>Settings</h1>
                <div className="tabs">
                  <button onClick={()=>changeTab("profilePicture")} className={ tab === "profilePicture" ? "active" : null }>Profile Picture</button>
                  <button onClick={()=>changeTab("personalInfo")} className={ tab === "personalInfo" ? "active" : null }>Personal Info</button>
                  <button onClick={()=>changeTab("password")} className={ tab === "password" ? "active" : null }>Password</button>
                </div>

          { tab === "profilePicture" && (
            <form onSubmit={handleSubmit}>

              { hasUploadedPhoto || (profilePicture && !newProfilePictureUrl) && (
                <div className="currentProfilePicture">
                  <p>This is your current profile picture</p>
                  <figure>
                    <img src={sessionUser.profilePictureUrl} alt="current profile picture" className="masked" />
                    <img src={sessionUser.profilePictureUrl} alt="current profile picture" className="bg" />
                  </figure>
                  <button className="reset" onClick={handleDeleteProfilePicture}>Delete this profile picture</button>
                </div>
              )}
              {newProfilePicture ? (
                <div className="currentProfilePicture">
                  <p>This is the image you selected.</p>
                  <figure>
                    <img src={newProfilePictureUrl} alt="selected media" className="masked" />
                    <img src={newProfilePictureUrl} alt="selected media" className="bg" />
                  </figure>
                  <button className="reset" onClick={handleDeleteProfilePicture}>Choose another image</button>
                </div>
              ):(
                <>
                  <label htmlFor="profilePicture">Select a file from your computer</label>
                  <input
                  type="file"
                  name="profilePicture"
                  value={newProfilePicture}
                  onChange={handleFile}
                  placeholder="Choose a file from your computer" /> 
                </>
              )}

              <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
              <button type="submit" disabled={ newProfilePicture ? null : "disabled" }>{uploadBtnLabel}</button>
            </form> 
          )}

          { tab === "personalInfo" && (
            <form onSubmit={handleSubmit}>
              {demoUser && (<div className="demoUser">The email of the demo user can't be changed</div>)}
              <label htmlFor="email">Change your email</label>
              <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={ demoUser ? "disabled" : null }
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
              <textarea name="bio" value={bio || ""} onChange={(e) => setBio(e.target.value)} placeholder="Bio">{bio || ""}</textarea>
              <label className="d-none">
                <input type="checkbox" checked={privateProfile} name="privateProfile" value={privateProfile} onChange={() => setPrivateProfile(!privateProfile)} /> 
                <div>
                  Private Profile <em>(only those who follow you can see your posts)</em>
                </div>
              </label>
              <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
              <button disabled={ personalInfoFormReady ? null : "disabled" }>{saveBtnLabel}</button>
            </form>
          )}

          { tab === "password" && (
            <form onSubmit={handleSubmit}>
              {demoUser && (<div className="demoUser">This feature is not available for the demo user</div>)}
              <label htmlFor="password">New password</label>
              <input
              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (min. 6 characters)"
              required
              disabled={ demoUser ? "disabled" : null }
              />
              <label htmlFor="confirmPassword">Confirm new password</label>
              <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Type password again to confirm"
              required
              disabled={ demoUser ? "disabled" : null }
              />
              <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
              <button type="submit" disabled={ confirmPassword.length >= 6 && confirmPassword === newPassword && !demoUser ? null : "disabled" }>{saveBtnLabel}</button>
            </form> 
          )}

          </div>
        </section>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }


}

export default Settings;