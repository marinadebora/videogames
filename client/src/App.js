import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import LandingPage from './components/Landingpage';
import Home from './components/Home.jsx';
import CreateVideogames from './components/CreateVideogames';
import VideogamesDetail  from './components/VideogamesDetail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Route exact path='/' element={<LandingPage />} />
      <Route exact path='/home' element={<Home />} />
      <Route path='/videogame' element={<CreateVideogames/>}/> 
      <Route  exact path='/home/:id' element={<VideogamesDetail />}/> 
      </div>
    </BrowserRouter>
  );
}

export default App;
