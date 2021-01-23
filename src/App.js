import React from 'react';
import './App.css';

// custom components
import UserView from './Components/UserView.js'
import AddUser from './Components/AddUser.js'
import UpdateUser from './Components/UpdateUser.js'
import CRUDinOne from './Components/CRUDinOne.js'
function App() {
  return (
    <div>
      {/* <AddUser/>
      <UserView/>
      <UpdateUser/> */}
      <CRUDinOne/>

    </div>
  );
}

export default App;