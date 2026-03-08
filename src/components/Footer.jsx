const Footer = () => {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '3rem 4rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem',
            color: 'var(--text-muted)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--accent-purple)' }}>AssessMate</span>
                <span>© 2026. All rights reserved.</span>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <a href="#" style={{ hover: { color: 'var(--text-primary)' } }}>Contact Us</a>
                <a href="#" style={{ hover: { color: 'var(--text-primary)' } }}>React.js</a>
                <a href="#" style={{ hover: { color: 'var(--text-primary)' } }}>Back To Top</a>
            </div>
        </footer>
    );
};

export default Footer;
