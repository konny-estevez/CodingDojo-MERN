import './App.css';
import { FormWrapper } from './components/FormWrapper';
import { Navbar } from './components/Navbar';
import { Wrapper } from './components/Wrapper';

function App() {
  return (
      <Wrapper>
        <Navbar/>
        <FormWrapper />
      </Wrapper>
  );
}

export default App;
