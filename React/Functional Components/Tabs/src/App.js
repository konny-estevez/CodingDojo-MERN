import './App.css';
import { TabControl } from './components/TabControl';

const tabs = [
  { id: "tab1", name: "Tab 1", content: "Content for tab 1."},
  { id: "tab2", name: "Tab 2", content: "Content for tab 2."},
  { id: "tab3", name: "Tab 3", content: "Content for tab 3."},
  { id: "tab4", name: "Tab 4", content: "Content for tab 4."},
  { id: "tab5", name: "Tab 5", content: "Content for tab 5."},
];

function App() {
  return (
    <div className="container">
      <br/>
      <TabControl tabs={tabs} />
    </div>
  );
}

export default App;
