import { GraduationCap, Mail, Lock, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Auth Navbar */}
            <nav style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>AssessMate</span>
                </Link>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                    <Link to="#">Help Center</Link>
                    <Link to="#">Institutional Access</Link>
                </div>
            </nav>

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
                {/* Decorative elements behind the card */}
                <div style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(235, 228, 255, 0) 70%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0
                }}></div>

                {/* Login Card */}
                <div style={{
                    backgroundColor: 'var(--bg-dark)',
                    width: '100%',
                    maxWidth: '440px',
                    padding: '3rem 2.5rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 25px 50px -12px rgba(31, 34, 65, 0.4)',
                    position: 'relative',
                    zIndex: 1,
                    color: 'white'
                }} className="animate-fade-in animate-float">

                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Please enter your institutional details</p>
                    </div>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
                        <Input
                            label="INSTITUTIONAL EMAIL"
                            placeholder="student@college.edu"
                            icon={Mail}
                            type="email"
                        />
                        <Input
                            label="PASSWORD"
                            placeholder="••••••••"
                            icon={Lock}
                            rightIcon={Eye}
                            type="password"
                        />

                        <Button variant="primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem', justifyItems: 'center' }}>
                            Login <ArrowRight size={18} />
                        </Button>
                    </form>

                    <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Forgot Password? <a href="#" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>Reset here</a>
                        </p>

                        <div style={{ height: '1px', backgroundColor: 'var(--border-dark)', margin: '0 1rem 1.5rem' }}></div>

                        <p style={{ color: 'var(--text-muted)' }}>
                            New to AssessMate? <Link to="/signup" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>Sign Up</Link>
                        </p>
                    </div>
                </div>
            </main>

            <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                © 2024 ASSESSMATE INC. SECURE INSTITUTIONAL ENVIRONMENT
            </footer>
        </div>
    );
};

export default Login;
