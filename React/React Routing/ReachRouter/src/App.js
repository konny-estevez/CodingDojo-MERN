import './App.css';
import { Router } from '@reach/router';
import { LoginComponent } from './components/LoginComponent';
import { DashboardComponent } from './components/DashboardComponent';
import { NavBar } from './components/NavBar';
import { DogsListComponent } from './components/DogsListComponent';
import { DogDetailsComponent } from './components/DogDetailsComponent';

function App() {
  return (
    <div className="App">
      <NavBar />
        <Router>
            <LoginComponent path="/login" />
            <DashboardComponent path="/dashboard" />
            <DogsListComponent path="/dogs" />
            <DogDetailsComponent path="/dogs/:id" />
        </Router>
    </div>
  );
}

export default App;
