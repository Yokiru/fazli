import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms/Button/Button';
import './Login.css';

// Simple password - change this to your desired password
const ADMIN_PASSWORD = '12345';

export function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === ADMIN_PASSWORD) {
            // Store auth flag in sessionStorage (clears when browser closes)
            sessionStorage.setItem('admin_authenticated', 'true');
            navigate('/admin');
        } else {
            setError(true);
        }
    };

    return (
        <main className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Admin Access</h1>
                    <p className="login-subtitle">Masukkan password untuk masuk</p>
                </div>

                {error && <div className="login-error">Password salah!</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            placeholder="••••••••"
                            required
                            className="form-input"
                            autoFocus
                        />
                    </div>

                    <Button className="login-btn">
                        Masuk
                    </Button>
                </form>
            </div>
        </main>
    );
}
