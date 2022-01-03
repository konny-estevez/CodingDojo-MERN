import './App.css';
import { Router } from '@reach/router';
import { HomeComponent } from './components/HomeComponent';
import { OneParmComponent } from './components/OneParmComponent';
import { WordComponent } from './components/WordComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <HomeComponent path="/home" />
        <OneParmComponent path="/:parm1" />
        <WordComponent path="/:word/:color1/:color2" />
      </Router>
    </div>
  );
}

export default App;
