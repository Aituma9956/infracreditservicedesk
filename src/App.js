import React, { useEffect, useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from '@azure/msal-react';
import { loginRequest } from "./config";
// import axios from 'axios';
import './App.css';
import Chat from './chat'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing';


const WrappedView = () => {
  const { instance, accounts } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [userEmail, setUserEmail] = useState('');

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        account : accounts[0],
        prompt: 'create',
      })
      .catch((error) => console.log(error));
  };
  console.log(accounts)
  const handleLogout = () => instance.logout();
  
  
   const Ename = `${activeAccount?.username}`;  
  //  this is for the useremail showing


  const Vname = activeAccount ? activeAccount.name.split(' ').slice(0, 2).join(' ') : '';
  // const Vname = activeAccount ? activeAccount.name.split(' ')[0] : ''; FOR ONLY FIRST NAME

  // const UName = `${accounts[0].name}` THIS IS FOR THE FULL NAME SHWOING

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <Chat handleOut={handleLogout} userName={Vname} userEmail={Ename} />
        ) : null}
      </AuthenticatedTemplate>

      
      <UnauthenticatedTemplate>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<Landing handleFun={handleRedirect} />} />
            </Routes>
          </Router>
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <WrappedView />
    </MsalProvider>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route exact path='/'Component={Landing}/>
//           <Route path='/Chat' element={<Chat/>}/>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

export default App;
