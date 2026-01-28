import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

/* ===== COMMON COMPONENTS ===== */
import AdminCalendarRequests from './components/Admin/AdminCalendarRequests';
import ChangePassword from './components/Admin/ChangePassword';

import Navbar from './components/navbar';
import Footer from './components/Footer';
import NotificationBanner from './components/NotificationBanner';
import ChatWidget from './components/ChatWidget/ChatWidget';
import DNAAnimation from './components/DNAAnimation';

/* ===== PAGES ===== */
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';

/* ===== ABOUT ===== */
import About from './components/About/About';
import Mission from './components/About/Mission';
import Value from './components/About/Value';
import Purpose from './components/About/Purpose';
import Principles from './components/About/Principles';

/* ===== AUTH ===== */
import Login from './components/Login/Login';
import Register from './components/Login/Register';

/* ===== ACADEMY ===== */
import PharmaAcademy from './components/p_academy/PharmaAcademy';
import Glance from './components/p_academy/Glance';
import CoreCareerStage from './components/p_academy/CoreCareerStage';
import UpskillResources from './components/p_academy/UpskillResources';
import EmpowerHuntingResources from './components/p_academy/EmpowerHuntingResources';

/* ===== FORUMS ===== */
import Forums from './components/forums/Forums';
import ProfessionalNetwork from './components/forums/ProfessionalNetwork';
import StudentSession from './components/forums/session';
import Calendar from './components/forums/calender';

/* ===== EMPOWER TECH AI ===== */
import EmpowerTechAI from './components/EmpowerTechAI/EmpowerTechAI';
import SkillBoard from './components/SkillBoard/SkillBoard';
import DynamicSkillBoard from './components/EmpowerTechAI/skill';
import EmergingTech from './components/EmpowerTechAI/emerging-tech';
import AI from './components/EmpowerTechAI/AI';
import Peptides from './components/EmpowerTechAI/Peptides';
import Devices from './components/EmpowerTechAI/Devices';
import Mrna from './components/EmpowerTechAI/Mrna';
import PersonalizedMedicine from './components/EmpowerTechAI/PersonalizedMedicine';

/* ===== NEWS & EVENTS ===== */
import News from './components/intelligenceHub/news';
import Events from './components/Events/Events';

/* ===== ADMIN ===== */
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import Enquiries from './components/Admin/Enquiries';
import AdminSessions from './components/Admin/adminSession';
import AdminNotifications from './components/Admin/AdminNotifications';
import ContentManagement from './components/Admin/ContentManagement';
import ChatManagement from './components/Admin/ChatManagement';
import AdminEvents from './components/Admin/AdminEvents';
import UserManagement from './components/Admin/UserManagement';

function App() {
  return (
    <Router>
      <div className="App">
        <DNAAnimation />

        <Routes>
          {/* ===== PUBLIC LAYOUT ===== */}
          <Route
            element={
              <>
                <NotificationBanner />
                <Navbar />
                <Outlet />
                <ChatWidget />
                <Footer />
              </>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/values" element={<Value />} />
            <Route path="/about/purpose" element={<Purpose />} />
            <Route path="/about/principles" element={<Principles />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="/academy" element={<PharmaAcademy />} />
            <Route path="/academy/glance" element={<Glance />} />
            <Route path="/academy/career-stages" element={<CoreCareerStage />} />
            <Route path="/academy/upskill" element={<UpskillResources />} />
            <Route path="/academy/hunting-resources" element={<EmpowerHuntingResources />} />

            <Route path="/forums" element={<Forums />} />
            <Route path="/network" element={<ProfessionalNetwork />} />
            <Route path="/session" element={<StudentSession />} />
            <Route path="/calendar" element={<Calendar />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/empower-tech-ai" element={<EmpowerTechAI />} />
            <Route path="/skill-board" element={<SkillBoard />} />
            <Route path="/empower/skill" element={<DynamicSkillBoard />} />
            <Route path="/empower/emerging-tech" element={<EmergingTech />} />
            <Route path="/empower/ai" element={<AI />} />
            <Route path="/empower/peptides" element={<Peptides />} />
            <Route path="/empower/devices" element={<Devices />} />
            <Route path="/empower/mrna" element={<Mrna />} />
            <Route path="/empower/personalized-medicine" element={<PersonalizedMedicine />} />

            <Route path="/intelligence-hub/news" element={<News />} />
            <Route path="/events" element={<Events />} />
          </Route>

          {/* ===== ADMIN ROUTES ===== */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="sessions" element={<AdminSessions />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="chat-enquiries" element={<ChatManagement />} />
            <Route path="events-control" element={<AdminEvents />} />
            <Route path="access-control" element={<UserManagement />} />
            <Route path="calendar-requests" element={<AdminCalendarRequests />} />

            {/* ✅ ADMIN PASSWORD */}
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
