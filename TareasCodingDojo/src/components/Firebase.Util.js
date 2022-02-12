import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getDatabase, ref, set, child, get } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiEBKmpAvJnNJirWi8LeFU96V_KnhfEZU",
  authDomain: "codingodojotaskscontrol.firebaseapp.com",
  projectId: "codingodojotaskscontrol",
  storageBucket: "codingodojotaskscontrol.appspot.com",
  messagingSenderId: "30937776932",
  appId: "1:30937776932:web:d35bd1f43331d6b09329b1",
  measurementId: "G-65TP953EY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const databaseRef = ref(getDatabase(app));

const registerUser = async (email, password) => {
  let result;
  await createUserWithEmailAndPassword(getAuth(), email, password)
    .then(user => result = user)
    .catch(error => error);
  return result;
}

const signInUser = async (email, password) => {
  let result;
  await signInWithEmailAndPassword(getAuth(), email, password)
    .then(response => result = response)
    .catch(error => result = error);
  return result;
}

const resetPassword = async (email) => {
  let result;
  await sendPasswordResetEmail(getAuth(), email)
    .then(response => result = response)
    .catch(error => result = error);
  return result;
}

const closeSession = async () => {
  let result;
  await signOut(getAuth())
    .then(response => result = response)
    .catch(error => result = error);
  return result;
}

const getStudents = async () => {
  let result;
  await get(child(databaseRef, "students")).then((snapshot) => {
    if (snapshot.exists()) {
      result = snapshot.val();
    } else {
      result = "No existen datos.";
    }
  }).catch((error) => {
    console.error(error);
  });
  return result;
}

const getStudentByEmail = (email) => {
  let result;
  get(child(databaseRef, `students`)).then((snapshot) => {
    if (snapshot.exists()) {
      result = snapshot.val().filter(item => item.email === email);
      return result;
    } else {
      result = [];
      return result;
    }
  }).catch((error) => {
    console.error(error);
  });
}

const verifyRegisterStudent = async (email, password) => {
  const result = await get(child(databaseRef, 'students'));
  if (result.exists()) {
    const student = result.val().filter(item => item.email === email);
    if (student && student.length > 0) {
      try {
        const response = await createUserWithEmailAndPassword(getAuth(), email, password);
        const studentRef = ref(getDatabase(), 'students');
        const students = result.val().map(item => {
          if (item.email === email) {
            return {
              ...item,
              active: true,
              id: response.user.uid,
            };
          }
          else {
            return item;
          }
        });
        set(studentRef, students);
        return response;
      }
      catch (error) {
        return error;
      }
    }
    else {
      return "Estudiante no registrado. Comuníquese con el administrador a konny.estevez@udla.edu.ec.";
    }
  }
  else {
    return "Error al verificar estudiante.";
  }
}

export const FirebaseUtil = {registerUser, validateUser: signInUser, getStudents, getStudent: getStudentByEmail, verifyRegisterStudent,
  resetPassword, signOut: closeSession
};