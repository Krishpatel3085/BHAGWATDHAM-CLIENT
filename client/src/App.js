import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Activities from './Pages/Activities.jsx';
import PublicationsPage from './Pages/Publications.jsx';
import ContactPage from './Pages/Contact.jsx';
import GalleryPage from './Pages/Gallery.jsx';
import SchoolPage from './Pages/School.jsx';
import ActivitiesDetailsPage from './Pages/ActivitiesDetailsPage.jsx';
import YearGalleryPage from './Pages/YearGalleryPage.jsx';
import ScrollToTop from './Pages/ScrollToTop.jsx';
import AdmissionForm from './Pages/AdmissionForm .jsx';

function App() {
  return (
    <>
    <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/school' element={<SchoolPage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/ActivitesDetailsPage/:activitie' element={<ActivitiesDetailsPage/>} />
        <Route path='/Publications' element={<PublicationsPage />} />
        <Route path='/aboutus' element={<About />} />
        <Route path='/contactus' element={<ContactPage />} />
        <Route path='/year/:year' element={<YearGalleryPage />} />
        <Route path='/admissionForm' element={<AdmissionForm/>}/>

      </Routes>
    </>
  );
}

export default App;
