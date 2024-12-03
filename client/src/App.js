import { Routes ,Route} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import School from './Pages/School.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/about-us' element={<School />} />

      </Routes>
    </>
  );
}

export default App;
