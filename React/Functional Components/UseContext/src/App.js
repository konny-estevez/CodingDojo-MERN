import { useState } from 'react';
import './App.css';
import AppWrapperComponent from './components/AppWrapperComponent';
import MyContext from './context/MyContext';

function App() {
const [val, setVal] = useState(5.749);

  return (
    <div className="App">
      <MyContext.Provider value={{val, setVal}}>
        <AppWrapperComponent>
        </AppWrapperComponent>
      </MyContext.Provider>
  </div>
  );
}

export default App;
