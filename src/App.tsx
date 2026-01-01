import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/organisms/Header/Header';
import { HomePage } from './pages/Home/Home';
import { AboutPage } from './pages/About/About';
import { ComingSoonPage } from './pages/ComingSoon/ComingSoon';
import { LoginPage } from './pages/Admin/Login';
import { AdminLayout } from './pages/Admin/AdminLayout';
import { Dashboard } from './pages/Admin/Dashboard';
import { ProjectsManager } from './pages/Admin/ProjectsManager';
import { ServicesManager } from './pages/Admin/ServicesManager';
import { AboutManager } from './pages/Admin/AboutManager';

/**
 * Main App Component with Routing
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <div className="ambient-glow" aria-hidden="true"></div>
            <Header />
            <HomePage />
          </>
        } />
        <Route path="/about" element={
          <>
            <div className="ambient-glow" aria-hidden="true"></div>
            <Header />
            <AboutPage />
          </>
        } />
        <Route path="/work" element={
          <>
            <div className="ambient-glow" aria-hidden="true"></div>
            <Header />
            <ComingSoonPage />
          </>
        } />

        {/* Admin Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="about" element={<AboutManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
