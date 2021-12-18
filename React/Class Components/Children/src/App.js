import React from 'react';
import './App.css';
import LightSwitch from './components/LightSwitch';
import MyNewComponent from './components/MyNewComponent';
    
function App() {
  return (
    <div className="App">
        <MyNewComponent header={ "Header Prop" }>
            <p>This is a child</p>
            <p>This is another child</p>
            <p>This is even another child</p>
        </MyNewComponent>  
        <LightSwitch/>
    </div>
  );
}
    
export default App;
