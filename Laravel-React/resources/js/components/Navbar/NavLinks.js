import React from 'react'

import NavLink from './NavLink.js';

const NavLinks = (props) => {
    return (
        props.links.map(link => <NavLink key={link.name} link={link} />)
    );
}

export default NavLinks
