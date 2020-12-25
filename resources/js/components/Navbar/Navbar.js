import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../../css/Navbar.css';
import Button from '../button/Button.js';
import NavLinks from './NavLinks.js';

const Navbar = (props) => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    const location = props.currentLocation();

    const getpathNames = (path) => {
        switch (path) {
            case '/':
            // case '/IT-products':
            case '/dashboard':
            case '/login':
            case '/register':
                return [{ "to": "/", "name": "Home" }, { "to": "/blog", "name": "Blog" }, /*{ "to": "/IT-products", "name": "IT Products" }*/ checkAppState().isLoggedIn && { 'to': '/dashboard', 'name': "Dashboard" }];
            case '/blog':
            case '/hobbies':
            case '/IT':
                return [{ "to": "/blog", "name": "blog" }, { "to": "/hobbies", "name": "Hobbies" }, { "to": "/IT", "name": "IT" }];
        }
    }

    const checkAppState = () => {
        const AppState = JSON.parse(localStorage["appState"]);
        return {
            isLoggedIn: AppState.isLoggedIn,
            user: AppState.user,
            hasEmailVerified: AppState.hasEmailVerified
        };
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <img className="logo-1" src='./images/logo-1.png' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-manu active' : 'nav-menu'}>
                        <NavLinks links={getpathNames(location.pathname)} />
                        <li className='nav-item'>

                            <Link to={!checkAppState().isLoggedIn ? '/login' : '/logout'} className='nav-links-mobile' onClick={closeMobileMenu}>
                                {!checkAppState().isLoggedIn ? 'Login' : 'Logout'}
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline' linkTo={!checkAppState().isLoggedIn ? '/login' : '/logout'}>{!checkAppState().isLoggedIn ? 'Login' : 'Logout'}</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar
