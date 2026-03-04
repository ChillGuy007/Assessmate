import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const SignUp = () => {
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
                    <Link to="/">Back to Home</Link>
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

                {/* SignUp Card */}
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
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create Account</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Empower your academic journey today.</p>
                    </div>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
                        <Input
                            label="FULL NAME"
                            placeholder="John Doe"
                            type="text"
                        />
                        <Input
                            label="INSTITUTIONAL EMAIL"
                            placeholder="name@university.edu"
                            type="email"
                        />
                        <Input
                            label="CREATE PASSWORD"
                            placeholder="••••••••"
                            type="password"
                        />
                        <Input
                            label="CONFIRM PASSWORD"
                            placeholder="••••••••"
                            type="password"
                        />

                        <Button variant="primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem', justifyItems: 'center' }}>
                            CREATE ACCOUNT
                        </Button>
                    </form>

                    <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Log In</Link>
                        </p>
                    </div>
                </div>
            </main>

            <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                © 2024 AssessMate. All rights reserved. <span style={{ margin: '0 0.5rem' }}>|</span> Privacy Policy <span style={{ margin: '0 0.5rem' }}>|</span> Terms of Service
            </footer>
        </div>
    );
};

export default SignUp;
