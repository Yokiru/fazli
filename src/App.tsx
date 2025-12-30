import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/organisms/Header/Header';
import { HomePage } from './pages/Home/Home';
import { AboutPage } from './pages/About/About';
import { ComingSoonPage } from './pages/ComingSoon/ComingSoon';

/**
 * Main App Component with Routing
 * Ref: MASTER_DESIGN_SYSTEM.md -> Layout
 */
function App() {
  return (
    <BrowserRouter>
      {/* Ambient background glow effect */}
      <div className="ambient-glow" aria-hidden="true"></div>

      {/* Sticky Navigation */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<ComingSoonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
