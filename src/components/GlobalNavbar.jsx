import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const GlobalNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <div style={{
            position: 'fixed',
            top: scrolled ? 0 : '1rem',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 100,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none', // Allow clicks to pass through the wrapper
        }}>
            <nav style={{
                padding: scrolled ? '1.5rem 4rem' : '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--bg-dark)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                width: scrolled ? '100%' : '80%',
                maxWidth: scrolled ? 'none' : '1200px',
                borderRadius: scrolled ? '0' : '100px',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                boxShadow: scrolled ? 'none' : '0 10px 30px -10px rgba(31, 34, 65, 0.5)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'auto', // Re-enable clicks for the nav itself
            }}>
                {/* Left side: Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <div style={{
                        background: 'var(--accent-purple, #6d28d9)',
                        color: 'white',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <GraduationCap size={24} />
                    </div>
                    <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'white',
                        display: scrolled ? 'block' : 'none',
                        transition: 'opacity 0.3s ease'
                    }}>AssessMate</span>
                </Link>

                {/* Middle: Links */}
                <div style={{
                    display: 'flex',
                    gap: '2.5rem',
                    alignItems: 'center',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.8)'
                }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Home</Link>
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Profile</Link>
                    <Link to="/analytics" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Analytics</Link>
                    <Link to="/feedback" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Feedback</Link>
                </div>

                {/* Right side: Login / Logout */}
                <div>
                    {user ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Button variant="secondary" onClick={logout} style={{
                                padding: "0.8rem 1.5rem",
                                borderRadius: "100px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                color: "white",
                                fontWeight: "600",
                                border: "none"
                            }}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button variant="primary" style={{
                                padding: "1rem 2.5rem",
                                borderRadius: "100px",
                                backgroundColor: "#22c55e",
                                color: "white",
                                fontWeight: "600",
                                boxShadow: "0 6px 18px rgba(34,197,94,0.35)",
                                border: "none"
                            }}>
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default GlobalNavbar;
