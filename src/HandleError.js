import React from 'react';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const nav = useNavigate();
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#282c34',
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            overflow: 'hidden',
            position: 'relative',
        },
        title: {
            fontSize: '70px',
            margin: '0',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            zIndex: 1,
        },
        message: {
            fontSize: '2em',
            margin: '0.5em 0',
            zIndex: 1,

        },
        button: {
            padding: '0.75em 1.5em',
            fontSize: '1.25em',
            color: '#282c34',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            zIndex: 1,
            width: '90%'
        },
        buttonHover: {
            backgroundColor: '#21a1f1',
        },
        background: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, #ff6b6b, #f8e1a1, #6b6bff, #a1f8e1)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            zIndex: 0,
            filter: 'blur(50px)',
        },
        '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
        },
    };

    const [buttonStyle, setButtonStyle] = React.useState(styles.button);

    const handleMouseEnter = () => {
        setButtonStyle({ ...styles.button, ...styles.buttonHover });
    };

    const handleMouseLeave = () => {
        setButtonStyle(styles.button);
    };

    return (
        <div style={styles.container}>
            <div style={styles.background}></div>
            <h1 style={styles.title}>404🦊</h1>
            <p style={styles.message}>Page Not Found</p>
            <button
                style={buttonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => nav('/', { replace: true })}
            >
                Go Home
            </button>
        </div>
    );
};

export default ErrorPage;
