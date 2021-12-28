import { useState } from 'react';
import './App.css';
import { Boxes } from './components/Boxes';
import { Form } from './components/Form';

function App() {
  const [colorsList, setColorsList] = useState([]);

  const onNewColor = (newColor) => {
    setColorsList([...colorsList, newColor]);
  }

  return (
    <div className="container">
      <Form onNewColor={onNewColor} />
      <Boxes colorsList={colorsList} />
    </div>
  );
}

export default App;
