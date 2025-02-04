import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import ActivitiesPage from './Pages/Activities.jsx';
import PublicationsPage from './Pages/Publications.jsx';
import ContactPage from './Pages/Contact.jsx';
import GalleryPage from './Pages/Gallery.jsx';
import SchoolPage from './Pages/School.jsx';
import ActivitiesDetailsPage from './Pages/ActivitiesDetailsPage.jsx';
import YearGalleryPage from './Pages/YearGalleryPage.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/school' element={<SchoolPage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/activities' element={<ActivitiesPage />} />
        <Route path='/ActivitesDetailsPage' element={<ActivitiesDetailsPage/>} />
        <Route path='/Publications' element={<PublicationsPage />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/contact-us' element={<ContactPage />} />
        <Route path='/year/:year' element={<YearGalleryPage />} />

      </Routes>
    </>
  );
}

export default App;
