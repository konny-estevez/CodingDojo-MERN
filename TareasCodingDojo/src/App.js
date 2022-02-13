import {Router} from '@reach/router';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { CreateCommentForm } from "./components/CreateCommentForm";
import { SplashScreen } from './components/SplashScreen';
import { useState } from 'react';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { StudentBootcamp } from './components/StudentBootcamp';
import { StudentsList } from './components/StudentsList';
import { StudentForm } from './components/StudentForm';
import { NavBar } from './components/NavBar';

function App() {
  const [user, setUser] = useState({});
  console.log("User en App:", user);

  return (
    <div className="container">
      <NavBar user={user} setUser={setUser}/>
      <br/>
      <h1 className="text-center">Control de Tareas - Coding Dojo</h1>
      <Router>
        <LoginForm path="/" setUser={setUser}/>
        <RegisterForm path="/register" />
        <ForgotPasswordForm path="/forgotPassword" />
        <SplashScreen path="/home" user={user}/>
        <StudentsList path="/students" user={user}/>
        <StudentForm path="/students/new" user={user} />
        <StudentForm path="/students/:editId" user={user} />
        <StudentBootcamp path="/student/bootcamp"/>
        <CreateCommentForm path="/comments/new" />
      </Router>
    </div>
  );
}

export default App;
