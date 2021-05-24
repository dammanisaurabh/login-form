import React, { useState } from 'react';

import { Input } from './InputTextField';
import { Footer } from './Footer';
import { fieldDetails } from '../helpers/fieldsMapping';
import { validate } from '../helpers/validationHelper';


import '../styles/Login.scss';

export const Login = ({ handleCreateAccountClick }) => {
  const [user, setUser] = useState({ username: {...fieldDetails}, password: {...fieldDetails} });
  const [isVerified, setVerifyingStatus] = useState(false);
  const[isFetching, setFetchingStatus] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    const errorMessage = validate(name, value);
    console.log(value);
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
    // handling button click for password
    if (isVerified) {
      const errorMessage = validate('password', user.password.value);
      if (!errorMessage) {

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
        setTimeout(() => {
          setFetchingStatus(false);
          setVerifyingStatus(true);
        }, 2000);
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
          <h3>Welcome</h3>
          <span>{user.username.value}</span>
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