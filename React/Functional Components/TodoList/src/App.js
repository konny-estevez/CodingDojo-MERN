import { useEffect, useState } from 'react';
import './App.css';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    try {
      const localData = localStorage.getItem('TODO_CACHE');
      if (localData) 
        setTodoList(JSON.parse(localData));
    }
    catch (error)
    {
      console.log(error);
    }
    return () => {
      
    }
  }, [])

  const onNewTask = (taskName) => {
    let newId = todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1;
    let newList = [...todoList, {id: newId, name: taskName, completed: false}];
    setTodoList(newList);
    localStorage.setItem('TODO_CACHE', JSON.stringify(newList));
  }

  const onCompleteTask = (id, name, value) => {
    let updatedList = todoList.map(item => {
      if(item.id === id) {
        return { ...item, completed: value };
      }
      return item;
    });
    setTodoList(updatedList);
    localStorage.setItem('TODO_CACHE', JSON.stringify(updatedList));
  }

  const onDeleteTask = (id) => {
    let updatedList = todoList.filter(item => item.id !== id);
    setTodoList(updatedList);
    localStorage.setItem('TODO_CACHE', JSON.stringify(updatedList));
  }

  return (
    <div className="container">
      <TodoForm onNewTask={onNewTask} />
      <TodoList todoList={todoList} onDeleteTask={onDeleteTask} onCompleteTask={onCompleteTask}/>
    </div>
  );
}

export default App;
