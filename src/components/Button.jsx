const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = {
        padding: '0.875rem 2rem',
        borderRadius: '0.5rem',
        fontWeight: 600,
        fontSize: '1rem',
        transition: 'all 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--accent-primary)',
            color: 'white',
            boxShadow: 'var(--shadow-glow)'
        },
        secondary: {
            backgroundColor: 'white',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-sm)'
        },
        outline: {
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--text-primary)'
        }
    };

    // Inline hover effects handling requires more complex state or CSS modules. 
    // Let's rely on standard CSS classes for hover effects attached to variants
    const variantClass = `btn-${variant}`;

    return (
        <button
            className={`btn ${variantClass} ${className}`}
            style={{ ...baseStyle, ...variants[variant], ...props.style }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
