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
import { ReviewsStudentList } from './components/Reviews/ReviewsStudentList';
import { ReviewStudentForm } from './components/Reviews/ReviewStudentForm';
import { FirebaseUtil } from './components/Utils/Firebase.Util';

function App() {
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const getData = async () => {
      const uid = localStorage.getItem("coding-dojo-tasks");
      if (uid && uid.length > 5) {
        let user = JSON.parse(uid);
        /*FirebaseUtil.getUserInfo(uid)
          .then(response => setUser(response))
          .catch(error => error);*/
        setUser(user);
        //console.log(uid);
        const admin = user.email &&  user.email === ("konny.estevez@gmail.com" || "ivan.delpozo@udla.edu.ec") ? true : false;
        const student = user.email && user.email !== "konny.estevez@gmail.com" ? true : false;
        let result = await FirebaseUtil.getStudents();
        let data = Object.keys(result).map(key => {
          return { id: key, name: result[key].name};
        });
        setStudents(data);
        setIsAdmin(admin);
        setIsStudent(student);
        if (!admin && !student) {
          navigate("/");
        }
      }
    }
    getData();
  }, []);
  
 
  return (
    <div className="container">
      { (isAdmin || isStudent) && user.uid ?
      <NavBar user={user} setUser={setUser} isAdmin={isAdmin} isStudent={isStudent} fullName={fullName}/> : ''}
      <br/>
      <h1 className="text-center">Control de Tareas - Coding Dojo</h1>
      <Router>
        <LoginForm path="/" setUser={setUser} isAdmin={isAdmin} isStudent={isStudent} setFullName={setFullName}/>
        <RegisterForm path="/register" />
        <ForgotPasswordForm path="/forgotPassword" />
        <ResetUsers path="/resetUsers" user={user} isAdmin={isAdmin}/>
        <SplashScreen path="/home" user={user} />
        <StudentsList path="/students" user={user} isAdmin={isAdmin}/>
        <StudentForm path="/students/new" user={user} isAdmin={isAdmin}/>
        <StudentForm path="/students/:editId" user={user} isAdmin={isAdmin}/>
        <StudentBootcamp path="/student/bootcamp" isAdmin={isAdmin}/>
        <BootcampsList path="/bootcamps" user={user} isAdmin={isAdmin}/>
        <BootcampForm path="/bootcamps/new" user={user} isAdmin={isAdmin}/>
        <BootcampForm path="/bootcamps/:editId" user={user} isAdmin={isAdmin}/>
        <TasksList path="/tasks" user={user} isAdmin={isAdmin} />
        <TasksForm path="/tasks/new" user={user} isAdmin={isAdmin}/>
        <TasksForm path="/tasks/:editId" user={user} isAdmin={isAdmin}/>
        <ReviewsList path="/reviews" user={user} isAdmin={isAdmin}/>
        <ReviewForm path="/reviews/new" user={user} isAdmin={isAdmin}/>
        <ReviewForm path="/reviews/:editId" user={user} isAdmin={isAdmin}/>
        <ReviewForm path="/reviews/:idBootcamp/:idStudentId" user={user} isAdmin={isAdmin}/>
        <ReviewsStudentList path="reviews/student/:studentId" isAdmin={isAdmin} students={students} />
        <ReviewStudentForm path="/reviews/student/:studentId/:reviewId" isAdmin={isAdmin} />
        <NotFoundPage default />
      </Router>
    </div>
  );
}

export default App;
