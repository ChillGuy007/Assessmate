import { GraduationCap, Mail, Star, BookOpen, IdCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { feedbackAPI, usersAPI } from '../services/api.js';

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

const CourseItem = ({ name, code, status, score, badge }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid #f3f4f6',
        backgroundColor: 'white'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
            <span style={{ fontSize: '1.125rem', fontWeight: 600, color: '#374151' }}>{name}</span>
            <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{code}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{status}</span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < score ? "#fbbf24" : "none"} color={i < score ? "#fbbf24" : "#d1d5db"} />
                ))}
            </div>
            <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: badge === 'Neutral' ? '#e2e8f0' : badge === 'Positive' ? '#dcfce3' : '#fee2e2',
                color: badge === 'Neutral' ? '#64748b' : badge === 'Positive' ? '#16a34a' : '#dc2626'
            }}>
                {badge}
            </span>
        </div>
    </div>
);

const StudentProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [feedbackHistory, setFeedbackHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError('');
                const [profileData, feedbackData] = await Promise.all([
                    usersAPI.getProfile(user.id),
                    feedbackAPI.getStudentFeedback(user.id)
                ]);
                setProfile(profileData);
                setFeedbackHistory(feedbackData);
            } catch (err) {
                setError(err.message || 'Failed to load student profile');
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user?.id]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: '#6b7280' }}>Loading student profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem 2rem', color: '#dc2626' }}>{error}</div>
            </div>
        );
    }

    const fullName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : 'Student';
    const courses = profile?.courses || [];
    const averageRating = feedbackHistory.length
        ? (feedbackHistory.reduce((sum, item) => sum + (Number(item.rating) || 0), 0) / feedbackHistory.length).toFixed(1)
        : '0.0';

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
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>{fullName || 'Alex Johnson'}</h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, marginTop: '0.5rem', marginBottom: '2rem' }}>
                            {profile?.role === 'student' ? 'Computer Science Major' : 'Student'}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.9 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <GraduationCap size={18} />
                                    <span>{profile?.institution || 'University of Technology'}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <IdCard size={18} />
                                    <span style={{ opacity: 0.6 }}>ID</span>
                                    <span>{profile?.id || '—'}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.9 }}>
                                <Mail size={18} />
                                <span>{profile?.email || user?.email || 'alex.johnson@university.edu'}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1, marginRight: '2rem' }}>
                        <img
                            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200"
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

                {/* Stats Row */}
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem' }}>
                    <StatCard
                        title={<><BookOpen size={16} /> Total Courses</>}
                        value={String(courses.length)}
                    />
                    <StatCard
                        title="Avg. Feedback Score"
                        value={averageRating}
                        suffix={
                            <div style={{ display: 'flex', gap: '0.1rem' }}>
                                {[...Array(5)].map((_, index) => (
                                    <Star key={index} size={16} fill={index < Math.round(Number(averageRating)) ? '#fbbf24' : 'none'} color={index < Math.round(Number(averageRating)) ? '#fbbf24' : '#d1d5db'} />
                                ))}
                            </div>
                        }
                    />
                    <StatCard
                        title="Feedback Submitted"
                        value={String(feedbackHistory.length)}
                        suffix={
                            <div style={{ display: 'flex', gap: '0.1rem' }}>
                                <Star size={16} fill="#10b981" color="#10b981" />
                                <Star size={16} fill="#10b981" color="#10b981" />
                                <Star size={16} fill="#10b981" color="#10b981" />
                                <Star size={16} color="#d1d5db" />
                            </div>
                        }
                    />
                </div>

                {/* Feedback Summary Section */}
                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#4b5563', marginBottom: '1.5rem' }}>Feedback Summary</h2>

                    <div style={{
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                        {feedbackHistory.length > 0 ? feedbackHistory.map((item) => (
                            <CourseItem
                                key={item.id}
                                name={item.name}
                                code={item.code}
                                status={item.sentiment === 'positive' ? 'Submitted' : 'Reviewed'}
                                score={Number(item.rating) || 0}
                                badge={item.sentiment ? item.sentiment[0].toUpperCase() + item.sentiment.slice(1) : 'Neutral'}
                            />
                        )) : (
                            <div style={{ background: 'white', padding: '1.5rem 2rem', color: '#6b7280' }}>
                                No feedback submitted yet.
                            </div>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default StudentProfile;