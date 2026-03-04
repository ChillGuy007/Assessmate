const Input = ({ icon: Icon, rightIcon: RightIcon, label, type = "text", ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            {label && (
                <label style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'white',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}>
                    {label}
                </label>
            )}
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-dark)',
                borderRadius: '0.5rem',
                padding: '0 1rem',
                transition: 'border-color 0.2s, background-color 0.2s',
            }} className="input-container">
                {Icon && (
                    <div style={{ color: 'var(--text-muted)', marginRight: '0.75rem', display: 'flex' }}>
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={type}
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        padding: '1rem 0',
                        fontSize: '1rem',
                        outline: 'none',
                        '::placeholder': {
                            color: 'var(--text-muted)'
                        }
                    }}
                    className="custom-input"
                    {...props}
                />
                {RightIcon && (
                    <div style={{ color: 'var(--text-muted)', marginLeft: '0.75rem', display: 'flex', cursor: 'pointer' }}>
                        <RightIcon size={18} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
