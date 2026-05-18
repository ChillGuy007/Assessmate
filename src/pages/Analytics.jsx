import {
  MessageSquare,
  Users,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Bell
} from "lucide-react";

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { analyticsAPI } from '../services/api.js';

const Analytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError('');

        const data = user?.role === 'faculty' && user?.id
          ? await analyticsAPI.getFacultyAnalytics(user.id)
          : await analyticsAPI.getDashboard();

        setAnalytics(data);
      } catch (err) {
        setError(err.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [user?.id, user?.role]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-secondary)' }}>Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem 2rem', color: '#dc2626' }}>
          {error}
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Feedback',
      value: String(analytics?.total_feedback ?? 0),
      icon: MessageSquare,
      color: '#34d399'
    },
    {
      title: user?.role === 'faculty' ? 'Students Enrolled' : 'Students Analyzed',
      value: String(analytics?.total_students ?? 0),
      icon: Users,
      color: '#a78bfa'
    },
    {
      title: 'Positive Sentiment',
      value: `${analytics?.positive_percent ?? 0}%`,
      icon: TrendingUp,
      color: '#34d399'
    },
    {
      title: 'Anomalies Detected',
      value: String((analytics?.anomalies || []).length),
      icon: AlertTriangle,
      color: '#fbbf24'
    }
  ];

  const anomalyAlerts = analytics?.anomalies?.length
    ? analytics.anomalies.map((item) => `${item.name} (${item.code}) - avg ${Number(item.avg_rating || 0).toFixed(1)}`)
    : [
        'Low satisfaction in Data Structures',
        'Sudden feedback spike in AI Lab',
        'Negative trend in Networks course'
      ];

  const performanceRows = (analytics?.courses || []).length > 0
    ? analytics.courses.map((course) => ({
        dept: course.name,
        score: Number(course.avg_rating || 0).toFixed(1),
        trend: Number(course.avg_rating || 0) >= 4 ? 'Improving' : Number(course.avg_rating || 0) >= 3 ? 'Stable' : 'Declining',
        color: Number(course.avg_rating || 0) >= 4 ? '#16a34a' : Number(course.avg_rating || 0) >= 3 ? '#ca8a04' : '#dc2626'
      }))
    : [
        { dept: 'Computer Science', score: '4.6', trend: 'Improving', color: '#16a34a' },
        { dept: 'Electronics', score: '4.2', trend: 'Stable', color: '#ca8a04' },
        { dept: 'Mechanical', score: '3.8', trend: 'Declining', color: '#dc2626' }
      ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, padding: '8rem 5rem 3rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Analytics Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            AI-powered insights from institutional feedback data
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '1.8rem',
                  borderRadius: '1rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
                }}
              >
                <div
                  style={{
                    background: '#f5f3ff',
                    width: '45px',
                    height: '45px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={22} color={stat.color} />
                </div>

                <h2 style={{ marginTop: '1rem', fontSize: '1.8rem' }}>{stat.value}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem',
            marginBottom: '3rem'
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={20} />
              <h3 style={{ fontWeight: 600 }}>Feedback Trends</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Monthly sentiment analysis across departments
            </p>

            <div
              style={{
                height: '220px',
                borderRadius: '0.75rem',
                background: 'linear-gradient(180deg,#ede9fe 0%,#ffffff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}
            >
              Chart Area
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={20} />
              <h3 style={{ fontWeight: 600 }}>Anomaly Alerts</h3>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {anomalyAlerts.map((alert, index) => (
                <div
                  key={index}
                  style={{
                    background: '#fef3c7',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  ⚠ {alert}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
          }}
        >
          <h3 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Department Performance</h3>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th>Department</th>
                <th>Feedback Score</th>
                <th>Sentiment</th>
                <th>Trend</th>
              </tr>
            </thead>

            <tbody>
              {performanceRows.map((row, index) => (
                <tr key={index} style={{ borderTop: '1px solid #eee' }}>
                  <td style={{ padding: '1rem 0' }}>{row.dept}</td>
                  <td>{row.score}</td>
                  <td>Positive</td>
                  <td style={{ color: row.color }}>{row.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
