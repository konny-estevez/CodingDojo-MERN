import './App.css';
import PersonCardBirthday from './components/PersonCardBirthday';

function App() {
  return (
    <div className="App">
      <PersonCardBirthday firstName="Jane" lastName="Doe" age={45} hairColor="Black"/>
      <PersonCardBirthday firstName="John" lastName="Smith" age={88} hairColor="Brown"/>
      <PersonCardBirthday firstName="Millard" lastName="Filmore" age={50} hairColor="Brown"/>
      <PersonCardBirthday firstName="Maria" lastName="Smith" age={62} hairColor="Brown"/>
    </div>
  );
}

export default App;
