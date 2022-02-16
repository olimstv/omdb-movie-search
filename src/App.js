import './App.css';
import { Route, Routes} from "react-router-dom";
import Watchlist from "./components/Watchlist";
import Home from './components/Home'
function App() {
  return (
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
        <Routes>
          <Route path='/watchlist' element={<Watchlist />}/>
        </Routes>
      </div>
  );
}

export default App;
