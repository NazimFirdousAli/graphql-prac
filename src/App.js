import React from 'react';
import './App.css';

// custom components
import UserView from './Components/UserView.js'
import AddUser from './Components/AddUser.js'
import UpdateUser from './Components/UpdateUser.js'

function App() {
  return (
    <div className="App">
      <UserView/>
      <AddUser/>
      <UpdateUser/>
    </div>
  );
}

export default App;