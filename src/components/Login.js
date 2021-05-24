import React, { useState } from 'react';

import { Input } from './InputTextField';
import { fieldDetails } from '../helpers/fieldsMapping';
import { validate } from '../helpers/validationHelper';
import firebase from '../firebase';
import { errorMessages } from '../helpers/constants';

import '../styles/Login.scss';

export const Login = ({ handleCreateAccountClick }) => {
  const [user, setUser] = useState({ username: {...fieldDetails}, password: {...fieldDetails} });
  const [isVerified, setVerifyingStatus] = useState(false);
  const[isFetching, setFetchingStatus] = useState(false);

  const { wrongPassword, wrongUsername } = errorMessages;

  const handleInputChange = event => {
    const { name, value } = event.target;
    const errorMessage = validate(name, value);
    setUser({
      ...user,
      [name]: {
        isTouched: true,
        value,
        errorMessage,
      }
    });
  }
  const handleNextClick = () => {
    const users = firebase.firestore().collection('Users');

    // handling button click for password
    if (isVerified) {
      const errorMessage = validate('password', user.password.value);
      if (!errorMessage) {
        users.where('username', '==', user.username.value).onSnapshot((snapshot) => {
          const users = [];
          snapshot.forEach(doc => {
            users.push(doc.data());
          });
          // User exists i.e. username is verified
          if (users[0] && users[0].password === user.password.value) {
            console.log('success');
            // username and passowrd matches. Redirect user to next page.
          }
          // No user found with the username
          else {
            setUser({
              ...user,
              password: {
                ...user.password,
                isTouched: true,
                errorMessage: wrongPassword,
              }
            });
          }
        });
      } else {
        setUser({
          ...user,
          password: {
            ...user.password,
            isTouched: true,
            errorMessage,
          }
        });
      }
    }

    // handling click for username
    else {
      const errorMessage = validate('username', user.username.value);
      if(!errorMessage) {
        setFetchingStatus(true);
        users.where('username', '==', user.username.value).onSnapshot((snapshot) => {
          const users = [];
          snapshot.forEach(doc => {
            users.push(doc.data());
          });
          // User exists i.e. username is verified
          if (users.length) {
            setFetchingStatus(false);
            setVerifyingStatus(true);
          }
          // No user found with the username
          else {
            setUser({
              ...user,
              username: {
                ...user.username,
                isTouched: true,
                errorMessage: wrongUsername,
              }
            });
            setFetchingStatus(false);
          }
        });
      } else {
        setUser({
          ...user,
          username: {
            ...user.username,
            isTouched: true,
            errorMessage,
          }
        });
      }
    }
  }
  return(
    <div className="login-container">
      {!isVerified ?
        <>
          <h3>Sign In</h3>
          <Input 
            label="Username"
            name="username" 
            value={user.username.value} 
            error={user.username.errorMessage}
            isTouched={user.username.isTouched}
            handleChange={handleInputChange} 
          />
          <button className="btn-primary" onClick={handleNextClick}>{isFetching ? 'Verifying' : 'Next'}</button>
          <div className="sign-in">
            <span className="autodesk-user-type">New to Autodesk? </span>
            <a href="" onClick={handleCreateAccountClick}>Create Account</a>
          </div>
        </>
        :
        <>
        <div className="password-header">
          <p className="back-icon" onClick={() => setVerifyingStatus(status => !status)}>&lt;</p>
          <div className="welcome-container">
            <p>Welcome</p>
            <p className="username">{user.username.value}</p>
          </div>
        </div>
          <Input 
            label="Password" 
            name="password" 
            type="password"
            value={user.password.value}
            error={user.password.errorMessage}
            isTouched={user.password.isTouched}
            handleChange={handleInputChange}
          />
          <button className="btn-primary" onClick={handleNextClick}>Sign In</button>
        </>
      }
    </div>
  )
}