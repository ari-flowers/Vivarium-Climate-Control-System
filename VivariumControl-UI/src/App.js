import './index.css'
import Lock from './components/Lock'
import HamburgerMenu from './components/HamburgerMenu';
import EnclosureList from './components/EnclosureList';
import CreateEnclosure from './components/CreateEnclosure';
import useEnclosuresContext from "./hooks/use-enclosures-context"

function App() {
  return (
    <div className="App">
      <Lock />
      <HamburgerMenu />
      <EnclosureList />
    </div>
  );
}

export default App;
