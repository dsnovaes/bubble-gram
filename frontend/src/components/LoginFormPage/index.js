import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleDemoLogin = (e) => {
        return dispatch(sessionActions.login({email: "demo@user.io", password: "password"}))
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password }))
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
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <label>Username
                    <input type="text" name="credential" value={credential} onChange={(e) => setCredential(e.target.value)} placeholder="Email or Username" required />
                </label>
                <label>Password
                    <input type="password" name="password" value={password} onChange={(e) => setCredential(e.target.value)} placeholder="Password" required />
                </label>
                <button>Login</button>
            </form>

            <button onClick={handleDemoLogin}>Demo Login</button>
        </>
    )
}
export default LoginFormPage;