import { useEffect, useState } from 'react';
import {Router, navigate} from '@reach/router';
import { LoginForm } from './components/Users/LoginForm';
import { RegisterForm } from './components/Users/RegisterForm';
import { SplashScreen } from './components/Home/SplashScreen';
import { ForgotPasswordForm } from './components/Users/ForgotPasswordForm';
import { NavBar } from './components/Home/NavBar';
import { StudentBootcamp } from './components/Students/StudentBootcamp';
import { StudentsList } from './components/Students/StudentsList';
import { StudentForm } from './components/Students/StudentForm';
import { ResetUsers } from './components/Users/ResetUsers';
import { BootcampsList } from './components/Bootcamps/BootcampsList';
import { TasksList } from './components/Tasks/TasksList';
import { ReviewsList } from './components/Reviews/ReviewsList';
import { BootcampForm } from './components/Bootcamps/BootcampForm';
import { TasksForm } from './components/Tasks/TasksForm';
import { ReviewForm } from './components/Reviews/ReviewForm';
import { NotFoundPage} from './components/Utils/NotFoundPage';

function App() {
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem("coding-dojo-tasks");
    if (uid && uid.length > 5) {
      let user = JSON.parse(uid);
      /*FirebaseUtil.getUserInfo(uid)
        .then(response => setUser(response))
        .catch(error => error);*/
      setUser(user);
      const admin = user.email &&  user.email === "konny.estevez@gmail.com" ? true : false;
      const student = user.email && user.email !== "konny.estevez@gmail.com" ? true : false;
      setIsAdmin(admin);
      setIsStudent(student);
      if (!admin && !student) {
        navigate("/");
      }
    }
  }, []);
  
 
  return (
    <div className="container">
      <NavBar user={user} setUser={setUser} isAdmin={isAdmin} isStudent={isStudent}/>
      <br/>
      <h1 className="text-center">Control de Tareas - Coding Dojo</h1>
      <Router>
        <LoginForm path="/" setUser={setUser} isAdmin={isAdmin} isStudent={isStudent}/>
        <RegisterForm path="/register" />
        <ForgotPasswordForm path="/forgotPassword" />
        <ResetUsers path="/resetUsers" user={user} />
        <SplashScreen path="/home" user={user}/>
        <StudentsList path="/students" user={user}/>
        <StudentForm path="/students/new" user={user} />
        <StudentForm path="/students/:editId" user={user} />
        <StudentBootcamp path="/student/bootcamp"/>
        <BootcampsList path="/bootcamps" user={user} />
        <BootcampForm path="/bootcamps/new" user={user} />
        <BootcampForm path="/bootcamps/:editId" user={user} />
        <TasksList path="/tasks" user={user}/ >
        <TasksForm path="/tasks/new" user={user} />
        <TasksForm path="/tasks/:editId" user={user} />
        <ReviewsList path="/reviews" user={user} />
        <ReviewForm path="/reviews/new" user={user} />
        <ReviewForm path="/reviews/:editId" user={user} />
        <NotFoundPage default />
      </Router>
    </div>
  );
}

export default App;
