import React from 'react'
import { Link } from 'react-router-dom'

import '../../../css/Footer.css'


function Footer() {
    return (
        <div className="footer-container">
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to="/" className="social-logo">
                            <img className="logo-1" src='./images/logo-1.png' />
                        </Link>
                    </div>
                    <small className="website-rights">Neltopia © 2020</small>
                    <div className="social-icons">
                        <Link
                            className="social-icon-link facebook"
                            to="/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link
                            className="social-icon-link instagram"
                            to="/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link
                            className="social-icon-link linkedin"
                            to="/"
                            target="_blank"
                            aria-label="LinkedIn"
                        >
                            <i className="fab fa-linkedin"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer
