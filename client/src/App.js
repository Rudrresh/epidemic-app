import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Home } from './pages/home';
import {Auth} from './pages/auth'
import { UpdateEntry } from './pages/update-entry';
import { Display } from './pages/display';
import { Navbar } from './components/navbar';


function App() {
  return (
    <div className="App">
      <header></header>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path= "/" element={<Home />} />
          <Route path= "/auth" element={<Auth />} />
          <Route path= "/update-entry" element={<UpdateEntry />} />
          <Route path= "/display" element={<Display/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
