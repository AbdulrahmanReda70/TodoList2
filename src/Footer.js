// src/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section contact">
                    <h4>Contact</h4>
                    <p>Phone: <a href="tel:01153171996">01153171996</a></p>
                    <p>Email: <a href="mailto:abdooreda70@gmail.com">abdooreda70@gmail.com</a></p>
                </div>
                <div className="footer-section address">
                    <h4>Address</h4>
                    <p>123 Main Street</p>
                    <p>Cairo, Egypt</p>
                </div>
                <div className="footer-section social">
                    <h4>Follow Us</h4>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Abdo Oreda. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
