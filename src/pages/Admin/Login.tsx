import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/atoms/Button/Button';
import './Login.css';

export function LoginPage() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // DUMMY EMAIL for Admin
    // User only sees password, but Supabase auth needs email
    const ADMIN_EMAIL = 'admin@fazlidesign.com';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: ADMIN_EMAIL,
                password,
            });

            if (error) {
                // If login fails, try to sign up automatically (First time setup)
                // Note: This is a convenience for the user's request to just "make it work" with a password
                if (error.message.includes('Invalid login') || error.message.includes('Email not confirmed')) {
                    // Check if we should try to register (or just show error)
                    // For security, usually we don't auto-register on failed login. 
                    // But for this specific "set it up now" request:
                    throw error;
                }
                throw error;
            }
            navigate('/admin');
        } catch (err: any) {
            setError('Password salah atau akun belum dibuat.');
        } finally {
            setLoading(false);
        }
    };

    // Helper to register the admin account one time
    const handleRegister = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: ADMIN_EMAIL,
            password: password,
        });
        setLoading(false);
        if (error) alert('Error: ' + error.message);
        else alert('Admin account created! You can now login.');
    };

    return (
        <main className="login-page">
            <div className="login-card reveal-image">
                <div className="login-header">
                    <h1 className="login-title">Admin Access</h1>
                    <p className="login-subtitle">Masukkan password untuk masuk</p>
                </div>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="form-input"
                            autoFocus
                        />
                    </div>

                    <Button className="login-btn" disabled={loading}>
                        {loading ? 'Memeriksa...' : 'Masuk'}
                    </Button>

                    {/* Discrete setup link */}
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="toggle-auth-link"
                        style={{ fontSize: '12px', opacity: 0.5 }}
                    >
                        First time? Setup Admin Account
                    </button>
                </form>
            </div>
        </main>
    );
}
