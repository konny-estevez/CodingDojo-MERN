import './App.css';
import MyButton from './components/MyButton';
import OtherComponent from './components/OtherComponent';
import { Provider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';

const engine = new Styletron();

function App() {
  return (
    <Provider value={engine}>
      <div className="App">
        <MyButton children={"Hello World"}/>
        <OtherComponent />
      </div>
    </Provider>
  );
}

export default App;
