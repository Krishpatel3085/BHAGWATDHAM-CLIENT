import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import School from './Pages/School.jsx';
import ActivitiesPage from './Pages/Activities.jsx';
import PublicationsPage from './Pages/Publications.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/about-us' element={<School />} />
        <Route path='/activities' element={<ActivitiesPage />} />
        <Route path='/Publications' element={<PublicationsPage />} />

      </Routes>
    </>
  );
}

export default App;
