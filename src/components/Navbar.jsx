import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
    return (
        <nav className="navbar" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '2rem 4rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 50
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    background: 'var(--accent-purple)',
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
                    color: 'var(--text-primary)'
                }}>AssessMate</span>
            </Link>

            <div style={{
                display: 'flex',
                gap: '2.5rem',
                alignItems: 'center',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--text-secondary)'
            }}>
                <Link to="#" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--text-primary)' } }}>Home</Link>
                <Link to="#" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--text-primary)' } }}>Pricing</Link>
                <Link to="#" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--text-primary)' } }}>FAQ</Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link to="/analytics">
                    <Button variant="primary" style={{
                        backgroundColor: "#22c55e",
                        color: "white",
                        border: "none",
                        padding: "0.6rem 1.4rem",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(34,197,94,0.35)",
                        transition: "0.2s"
                    }}>Analytics</Button>
                </Link>
                <Link to="/login">
                    <Button variant="primary" style={{
                        backgroundColor: "#22c55e",
                        color: "white",
                        border: "none",
                        padding: "0.6rem 1.4rem",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(34,197,94,0.35)",
                        transition: "0.2s"
                    }}>
                        Get Started Free
                    </Button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
