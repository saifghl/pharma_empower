import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import PharmaAcademy from './components/p_academy/PharmaAcademy';
import ProfessionalNetwork from './components/forums/ProfessionalNetwork';
import PrivacyPolicy from './components/PrivacyPolicy';
import './App.css';
import EmpowerTechAI from './components/EmpowerTechAI/EmpowerTechAI';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/academy" element={<PharmaAcademy />} />
          <Route path="/network" element={<ProfessionalNetwork />} />
          <Route path="/About" element={<Value/>} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
