import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getDatabase, ref, set, child, get, push } from 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_CDT_APIKEY,
  authDomain: process.env.REACT_APP_CDT_AUTHDOMAIN,
  projectId: process.env.REACT_APP_CDT_PROJECTID,
  storageBucket: process.env.REACT_APP_CDT_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_CDT_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_CDT_APPID,
  measurementId: process.env.REACT_APP_CDT_MEASUREMENTID
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

const resetUsers = async (user) => {
  let result;
  let auth = getAuth();
  result = auth.listUsers(1000);
  console.log(result);
  /*getUsers(auth, {})
    .then(response => {console.log(response);
      response.users.forEach((userRecord) => {
        console.log(userRecord);
      });
    })
    .catch(error => console.error(error));*/
}

const getUserInfo = (uid) => {
  let result;
  /*getUser(uid)
    .then(response => result = response)
    .catch(error => error);*/
  return result;
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

const getStudents = async (bootcampId) => {
  let result;
  if (bootcampId) {
    await get(child(databaseRef, "bootcamps/" + bootcampId)).then((snapshot) => {
      if (snapshot.exists()) {
        result = snapshot.val().students ?? [];
      } else {
        result = "No existen datos.";
      }
    }).catch(error => result = error);
    return result;
  }
  else {
    await get(child(databaseRef, "students")).then((snapshot) => {
      if (snapshot.exists()) {
        result = snapshot.val();
      } else {
        result = "No existen datos.";
      }
    }).catch(error => result = error);
    return result;
  }
}

const getStudentByEmail = (email) => {
  let result;
  get(child(databaseRef, 'students')).then((snapshot) => {
    if (snapshot.exists()) {
      result = snapshot.val().filter(item => item.email === email);
      return result;
    } else {
      result = [];
      return result;
    }
  }).catch((error) => result = error);
  return result;
}

const getStudent = async (id) => {
  let result;
  await get(child(databaseRef, 'students/' + id)).then((snapshot) => {
    if (snapshot.exists()) {
      result = snapshot.val();
      return result;
    }
    else {
      result = [];
      return result;
    }
  })
  .catch(error => result = error);
  return result;
}

const updateStudent = async (id, student) => {
  if (!id) {
    const response = await createUserWithEmailAndPassword(getAuth(), student.email, "12345678");
    student.id = response.user.uid;
    student.active = true;
    id = student.id;
  }
  const itemRef = ref(getDatabase(), 'students/' + id);
  await set(itemRef, student)
    .then(response => response)
    .catch(error => error);
    student.id = id;
  return student;
}

const updateStudentId = async (id) => {
  let result;
  try {
    await getStudent(id)
      .then(async (response) => {
        if (typeof(response) === "object") {
          const student = response;
          student.active = true;
            await updateStudent(null, student)
              .then(response => {console.log(response);
                result = response;
              })
              .catch(error => error);
        }
      })
      .catch(error => error);
      console.log(result);
      deleteStudent(id);
      return result;
  }
  catch {
    return false;
  }
}

const deleteStudent = (id) => {
  try {
    const itemRef = ref(getDatabase(), 'students/' + id);
    set(itemRef, null);
    return true;
  }
  catch(error ) {
    return false;
  }
}

const getBootcamps = async () => {
  let result;
  await get(child(databaseRef, "bootcamps")).then((snapshot) => {
    if (snapshot.exists()) {
      result = snapshot.val();
    } else {
      result = "No existen datos.";
    }
    return result;
  }).catch(error => result = error);
  return result;
}

const getBootcamp = async (id) => {
  let result;
  await get(child(databaseRef, 'bootcamps/' + id)).then((snapshot) => {
    if (snapshot.exists()) {
      result = snapshot.val();
      return result;
    }
    else {
      result = [];
      return result;
    }
  })
  .catch(error => result = error);
  return result;
}

const getBootcampStudents = async (bootcampId) => {
  let result = await getBootcamp(bootcampId);
  if(result && typeof(result) === "object") {
    result = result.students ? result.students : [];
  } 
  return result;
}

const getBootcampTasks = async (bootcampId) => {
  let result = await getBootcamp(bootcampId);
  if(result && typeof(result) === "object") {
    result = result.students ? result.tasks : [];
  } 
  return result;
}

const updateBootcampId = async (id) => {
  let oldItem;
  await get(child(databaseRef, `bootcamps/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      oldItem = snapshot.val();
    } else {
      oldItem = "No existen datos.";
    }
  }).catch((error) => {
    console.error(error);
  });
  const newKey = push(child(ref(getDatabase()), 'bootcamps')).key;
  const collectionRef = ref(getDatabase(), 'bootcamps/' + newKey);
  oldItem.active = true;
  set(collectionRef, oldItem);
  const itemRef = ref(getDatabase(), 'bootcamps/' + id);
  set(itemRef, null);
  return newKey;
}

const updateBootcamp = async (id, bootcamp) => {
  if (!id) {
    const newKey = push(child(ref(getDatabase()), 'bootcamps')).key;
    bootcamp.active = true;
    id = newKey;
  }
  const itemRef = ref(getDatabase(), 'bootcamps/' + id);
  await set(itemRef, bootcamp)
    .then(response => response)
    .catch(error => error);
    bootcamp.id = id;
  return bootcamp;
}

const updateBootcampStudents = async (bootcampId, content) => {
  let bootcamp = await getBootcamp(bootcampId);
  const itemRef = ref(getDatabase(), 'bootcamps/' + bootcampId);
  bootcamp.students = content;
  set(itemRef, bootcamp)
  .then(response => response)
  .catch(error => error);
  bootcamp.id = bootcampId;
  return bootcamp;
}

const updateBootcampTasks = async (bootcampId, content) => {
  let bootcamp = await getBootcamp(bootcampId);
  const itemRef = ref(getDatabase(), 'bootcamps/' + bootcampId);
  bootcamp.tasks = content;
  set(itemRef, bootcamp)
  .then(response => response)
  .catch(error => error);
  bootcamp.id = bootcampId;
  return bootcamp;
}

const deleteBootcamp = (id) => {
  try {
    const itemRef = ref(getDatabase(), 'bootcamps/' + id);
    set(itemRef, null);
    return true;
  }
  catch(error ) {
    return false;
  }
}

const getTasks = async (bootcampId) => {
  let result;
  if (bootcampId) {
    await get(child(databaseRef, "bootcamps/" + bootcampId)).then((snapshot) => {
      if (snapshot.exists()) {
        result = snapshot.val().tasks ?? [];
      } else {
        result = "No existen datos.";
      }
    }).catch(error => result = error);
    return result;
  }
  else {
    await get(child(databaseRef, "tasks")).then((snapshot) => {
      if (snapshot.exists()) {
        result = snapshot.val();
      } else {
        result = "No existen datos.";
      }
      return result;
    }).catch(error => result = error);
    return result;
  }
}

const getTask = async (id) => {
  let result;
  await get(child(databaseRef, 'tasks/' + id)).then((snapshot) => {
    if (snapshot.exists()) {
      result = snapshot.val();
      return result;
    }
    else {
      result = [];
      return result;
    }
  })
  .catch(error => result = error);
  return result;
} 

const updateTaskId = async (id) => {
  let oldItem;
  await get(child(databaseRef, `tasks/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      oldItem = snapshot.val();
    } else {
      oldItem = "No existen datos.";
    }
  }).catch((error) => {
    console.error(error);
  });
  const newKey = push(child(ref(getDatabase()), 'tasks')).key;
  const collectionRef = ref(getDatabase(), 'tasks/' + newKey);
  oldItem.active = true;
  set(collectionRef, oldItem);
  const itemRef = ref(getDatabase(), 'tasks/' + id);
  set(itemRef, null);
  return newKey;
}

const updateTask = async (id, bootcamp) => {
  if (!id) {
    const newKey = push(child(ref(getDatabase()), 'tasks')).key;
    bootcamp.active = true;
    id = newKey;
  }
  const itemRef = ref(getDatabase(), 'tasks/' + id);
  await set(itemRef, bootcamp)
    .then(response => response)
    .catch(error => error);
    bootcamp.id = id;
  return bootcamp;
}

const deleteTask = (id) => {
  try {
    const itemRef = ref(getDatabase(), 'tasks/' + id);
    set(itemRef, null);
    return true;
  }
  catch(error ) {
    return false;
  }
}

const getReviews = async () => {
  let result;
  await get(child(databaseRef, "reviews")).then((snapshot) => {
    if (snapshot.exists()) {
      result = snapshot.val();
    } else {
      result = "No existen datos.";
    }
    return result;
  }).catch(error => result = error);
  return result;
}

const getReview = async (id) => {
  let result;
  await get(child(databaseRef, 'reviews/' + id)).then((snapshot) => {
    if (snapshot.exists()) {
      result = snapshot.val();
      result.id = id;
      return result;
    }
    else {
      result = [];
      return result;
    }
  })
  .catch(error => result = error);
  return result;
} 

const updateReview = async (id, review) => {
  if (!id) {
    const newKey = push(child(ref(getDatabase()), 'reviews')).key;
    review.name = "Revisión Inicial";
    id = newKey;
  }
  const itemRef = ref(getDatabase(), 'reviews/' + id);
  await set(itemRef, review)
    .then(response => response)
    .catch(error => error);
    review.id = id;
  return review;
}

const updateStudentReview = (id, Review) => {

}

const deleteReview = (id) => {
  try {
    const itemRef = ref(getDatabase(), 'Review/' + id);
    set(itemRef, null);
    return true;
  }
  catch(error ) {
    return false;
  }
}

export const FirebaseUtil = {registerUser, signInUser, resetUsers, verifyRegisterStudent,resetPassword, closeSession, getUserInfo,
  getStudent, updateStudent, deleteStudent, updateStudentId, getStudents, getStudentByEmail,
  getBootcamps, getBootcamp, updateBootcampId, updateBootcamp, deleteBootcamp, getBootcampStudents, updateBootcampStudents,
  getBootcampTasks, updateBootcampTasks,
  getTasks, getTask, updateTaskId, updateTask, deleteTask,
  getReviews, getReview, updateReview, deleteReview, updateStudentReview
};