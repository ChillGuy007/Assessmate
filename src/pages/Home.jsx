import { ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

const Home = () => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10rem' }}>
                {/* Hero Section */}
                <section className="container" style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '6rem' }}>
                    <p style={{
                        color: 'var(--accent-purple)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: '0.875rem',
                        marginBottom: '1.5rem'
                    }}>INSTITUTIONAL DATA PLATFORM</p>

                    <h1 className="h1" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                        Empowering Academic Excellence Through <br />
                        <span className="text-gradient">Student Insights</span>
                    </h1>

                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '3rem',
                        lineHeight: 1.6,
                        maxWidth: '600px',
                        margin: '0 auto 3rem'
                    }}>
                        A cutting-edge platform to aggregate student feedback, drive academic growth, and unlock the potential of every classroom.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Button variant="primary" style={{ padding: '1rem 2.5rem', borderRadius: '100px' }}>
                            Get Started Free
                        </Button>
                        <Button variant="secondary" style={{ padding: '1rem 2.5rem', borderRadius: '100px', backgroundColor: 'white', color: 'var(--text-primary)', boxShadow: '0 4px 14px 0 rgba(0,0,0,0.05)' }}>
                            View Demo
                        </Button>
                    </div>
                </section>

                {/* Status Indicators */}
                <section style={{
                    backgroundColor: 'var(--bg-dark)',
                    borderRadius: '100px',
                    padding: '1.5rem 3rem',
                    display: 'flex',
                    gap: '4rem',
                    color: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    marginBottom: '8rem'
                }} className="animate-float">
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DATABASE</p>
                        <p style={{ fontWeight: 600, fontSize: '1.125rem' }}>Communicating</p>
                    </div>
                    <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI ENGINE</p>
                        <p style={{ fontWeight: 600, fontSize: '1.125rem' }}>Running</p>
                    </div>
                    <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ANALYTICS</p>
                        <p style={{ fontWeight: 600, fontSize: '1.125rem' }}>Syncing</p>
                    </div>
                </section>

                {/* Features Cards */}
                <section className="container" style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    marginBottom: '8rem',
                    flexWrap: 'wrap'
                }}>
                    {[
                        { title: "Smart Analytics", desc: "Turn raw feedback into actionable insights with ML algorithms developed for education.", icon: "📊" },
                        { title: "Sentiment Engine", desc: "Leverage NLP technology to recognize student sentiment across varied learning styles over time.", icon: "🧠" },
                        { title: "Trend Discovery", desc: "Macroscopic trends visible for admin departments to dynamically assist academic growth.", icon: "📈" }
                    ].map((feature, i) => (
                        <div key={i} style={{
                            backgroundColor: 'white',
                            padding: '2.5rem',
                            borderRadius: '1rem',
                            width: 'calc(33.333% - 1.33rem)',
                            minWidth: '300px',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            cursor: 'default'
                        }} className="feature-card">
                            <div style={{
                                backgroundColor: 'var(--bg-primary)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                fontSize: '1.25rem'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{feature.desc}</p>
                        </div>
                    ))}
                </section>

                {/* CTA Section */}
                <section className="container" style={{ marginBottom: '6rem' }}>
                    <div style={{
                        backgroundColor: 'var(--bg-dark)',
                        borderRadius: '1.5rem',
                        padding: '4rem',
                        textAlign: 'center',
                        color: 'white',
                        boxShadow: 'var(--shadow-xl)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <h2 className="h2" style={{ marginBottom: '1rem' }}>Ready to transform your institution?</h2>
                        <p style={{
                            color: 'rgba(255,255,255,0.7)',
                            maxWidth: '500px',
                            margin: '0 auto 3rem',
                            fontSize: '1.125rem'
                        }}>
                            Join the 500+ academic frameworks using AssessMate to build a data-driven future.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Button variant="primary" style={{ padding: '1rem 2.5rem', borderRadius: '100px' }}>
                                Get Started Free
                            </Button>
                            <Button variant="ghost" style={{
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                padding: '1rem 2.5rem',
                                borderRadius: '100px',
                                transition: 'background-color 0.2s'
                            }} className="btn-hover-light">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
