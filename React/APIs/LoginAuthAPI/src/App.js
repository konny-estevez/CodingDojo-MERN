import { useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import { Users } from './components/Users';

function App() {
  const [session, setSession] = useState({});
  
  return (
    <div className="App">
      <h1>Login API</h1>
      {!session.Token ? <Login setSession={setSession} /> : ''}
      <hr/>
      <Users session={session} />
    </div>
  );
}

export default App;
