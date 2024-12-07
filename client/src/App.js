import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import School from './Pages/School.jsx';
import ActivitiesPage from './Pages/Activities.jsx';
import PublicationsPage from './Pages/Publications.jsx';
import ContactPage from './Pages/Contact.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/school' element={<School />} />
        <Route path='/gallery' element={<School />} />
        <Route path='/activities' element={<ActivitiesPage />} />
        <Route path='/Publications' element={<PublicationsPage />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/contact-us' element={<ContactPage />} />

      </Routes>
    </>
  );
}

export default App;
