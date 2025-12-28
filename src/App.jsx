import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import PharmaAcademy from './components/p_academy/PharmaAcademy';
import ProfessionalNetwork from './components/forums/ProfessionalNetwork';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About/About';
import EmpowerTechAI from './components/EmpowerTechAI/EmpowerTechAI';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import SkillBoard from './components/SkillBoard/SkillBoard';
import DynamicSkillBoard from './components/EmpowerTechAI/skill';
import EmergingTech from './components/EmpowerTechAI/emerging-tech';
import AI from './components/EmpowerTechAI/AI';
import StudentSession from './components/forums/session';
import MainLayout from './components/MainLayout';
import AdminLayout from './components/Admin/AdminLayout';
import AdminLogin from './components/Admin/AdminLogin';
import Dashboard from './components/Admin/Dashboard';
import Enquiries from './components/Admin/Enquiries';
import CMSManager from './components/Admin/CMS/CMSManager';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App">
          {/* Navigation and Footer are now handled inside layouts */}
          <Routes>
            {/* PUBLIC ROUTES (With Navbar & Footer) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/empower-tech-ai" element={<EmpowerTechAI />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/academy" element={<PharmaAcademy />} />
              <Route path="/network" element={<ProfessionalNetwork />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/skill-board" element={<SkillBoard />} />
              <Route path="/empower/skill" element={<DynamicSkillBoard />} />
              <Route path="/empower/emerging-tech" element={<EmergingTech />} />
              <Route path="/empower/ai" element={<AI />} />
              <Route path="/session" element={<StudentSession />} />
            </Route>

            {/* ADMIN ROUTES (No Navbar/Footer, with Sidebar) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="cms" element={<CMSManager />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
