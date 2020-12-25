import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const NavLink = (props) => {
    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);

    return (
        <li className='nav-item'>
            <Link to={props.link.to} className='nav-links' onClick={closeMobileMenu}>
                {props.link.name}
            </Link>
        </li>
    );
}

export default NavLink
