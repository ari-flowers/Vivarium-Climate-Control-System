import './index.css'
import Lock from './components/Lock'
import EnclosureList from './components/EnclosureList';
import CreateEnclosure from './components/CreateEnclosure';

function App() {
  return (
    <div className="App">
      <Lock />
      <EnclosureList />
      <CreateEnclosure />
    </div>
  );
}

export default App;
