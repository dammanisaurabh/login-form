import React, { useEffect, useState } from 'react';
import { Input } from './InputTextField';
import { createUserFields, fieldDetails } from '../helpers/fieldsMapping';
import { validate } from '../helpers/validationHelper';
import '../styles/CreateAccount.scss';

const initialUserState = {
  firstname: {...fieldDetails},
  lastname: {...fieldDetails},
  username: {...fieldDetails},
  reUsername: {...fieldDetails},
  password: {...fieldDetails},
  rePassword: {...fieldDetails},
}

export const CreateAccount = ({ handleCreateAccountClick }) => {
  const [showSuccessMessage, setSuccessStatus] = useState(true);
useEffect(() => {
  if (showSuccessMessage) {
    setTimeout(() => {
      setSuccessStatus(false);
    }, 5000);
  }
}, [showSuccessMessage, setSuccessStatus])

  const [user, setUser] = useState(initialUserState);
  const handleSubmit = event => {
    event.preventDefault();
    let anyError = false;
    const updatedUser = Object.keys(user).reduce((acc, name) => {
      const errorMessage = validate(name, user[name].value, user);
      if (! anyError && errorMessage) anyError = true;
      return {
        ...acc,
        [name]: {
          ...user[name],
          isTouched: true,
          errorMessage,
        }
      };
    }, {});
    if (!anyError) {
      setSuccessStatus(true);
    } else {
      setUser(updatedUser);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    const errorMessage = validate(name, value, user);
    setUser({
      ...user,
      [name]: {
        value,
        isTouched: true,
        errorMessage,
      }
    });

  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="create-user-container">
        {showSuccessMessage && <p className="success-message">Account created successfully</p>}
        <h3>Create account</h3>
        {createUserFields.map(({ label, name, type }) => {
          return(
            <Input
              key={name}
              label={label}
              value={user[name].value}
              name={name} type={type}
              className={name}
              handleChange={handleInputChange}
              error={user[name].errorMessage}
              isTouched={user[name].isTouched}
            />
          )
        })}
        <button type="submit" className="btn-primary" onClick={handleSubmit}>Create account</button>
        <div className="sign-in">
            <span className="autodesk-user-type">Already have an account? </span>
            <a href="" onClick={handleCreateAccountClick}> Sign In</a>
        </div>
      </div>
    </form>
  );
}

