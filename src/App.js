import React, { useState } from 'react';
import { Login } from './components/Login';
import { CreateAccount } from './components/CreateAccount';
import { Footer } from './components/Footer';
import './App.scss';

function App() {
  const [newUser, setUserStatus] = useState(false);

  const handleCreateAccountClick = event => {
    event.preventDefault();
    setUserStatus(newUser => !newUser);
  }
  return (
    <>
    <div className="App">
      {newUser
      ? <CreateAccount handleCreateAccountClick={handleCreateAccountClick} />
      : <Login handleCreateAccountClick={handleCreateAccountClick} />}
    </div>
    <Footer />
    </>
  );
}

export default App;
