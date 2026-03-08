import { GraduationCap, Mail, Phone, ChevronRight } from 'lucide-react';

const StatCard = ({ title, value, subtitle, suffix }) => (
    <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '1rem',
        flex: 1,
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>
            {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 700, color: '#374151' }}>{value}</span>
            {suffix && suffix}
        </div>
        {subtitle && <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{subtitle}</div>}
    </div>
);

const FacultyProfile = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F5F3FF', paddingTop: '80px' }}>
            <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>

                {/* Profile Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, #a78bfa, #c4b5fd)',
                    borderRadius: '1.5rem',
                    padding: '3rem',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 10px 25px rgba(167, 139, 250, 0.2)'
                }}>
                    {/* Decorative background overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0, right: 0, bottom: 0, left: 0,
                        background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        opacity: 0.5
                    }}></div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>Dr. Sarah Thompson</h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, marginTop: '0.5rem', marginBottom: '2rem' }}>
                            Professor of Computer Science
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.9 }}>
                                <GraduationCap size={18} />
                                <span>Computer Science Department</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.9 }}>
                                <Mail size={18} />
                                <span>sarah.thompson@university.edu</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.9 }}>
                                <Phone size={18} />
                                <span>123-456-7890</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1, marginRight: '2rem' }}>
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
                            alt="Profile"
                            style={{
                                width: '180px',
                                height: '180px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '4px solid rgba(255,255,255,0.3)'
                            }}
                        />
                    </div>
                </div>

                {/* Courses Section */}
                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#4b5563', marginBottom: '1.5rem' }}>Courses Taught</h2>

                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                        {[
                            { name: 'Data Structures', code: 'SDEL456' },
                            { name: 'Artificial Intelligence', code: 'PLE122' },
                            { name: 'Algorithms', code: 'PLE211' }
                        ].map((course, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1.5rem 2rem',
                                borderBottom: idx !== 2 ? '1px solid #f3f4f6' : 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '1.125rem', fontWeight: 600, color: '#374151' }}>{course.name}</span>
                                    <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{course.code}</span>
                                </div>
                                <ChevronRight size={20} color="#9ca3af" />
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default FacultyProfile;
