import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/atoms/Button/Button';
import './Admin.css';

export function AdminLayout() {
    const location = useLocation();

    // Simple auth check - just check sessionStorage
    const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        sessionStorage.removeItem('admin_authenticated');
        window.location.href = '/login';
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <span>Fazli Admin</span>
                </div>

                <nav className="admin-nav">
                    <Link
                        to="/admin"
                        className={`admin-nav-item ${location.pathname === '/admin' ? 'active' : ''}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/projects"
                        className={`admin-nav-item ${location.pathname.includes('/projects') ? 'active' : ''}`}
                    >
                        Projects
                    </Link>
                    <Link
                        to="/admin/services"
                        className={`admin-nav-item ${location.pathname.includes('/services') ? 'active' : ''}`}
                    >
                        Services
                    </Link>
                    <Link
                        to="/admin/about"
                        className={`admin-nav-item ${location.pathname.includes('/about') ? 'active' : ''}`}
                    >
                        About & Stack
                    </Link>
                </nav>

                <div className="admin-logout">
                    <Button variant="ghost" size="small" onClick={handleLogout}>
                        Keluar
                    </Button>
                </div>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
}
