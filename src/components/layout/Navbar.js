import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PATH_HOME = '/';
const PATH_ABOUT = '/about';

const Navbar = ({ title }) => {
    return (
        <nav className='navbar bg-primary'>
            <h1>
                <Link to={PATH_HOME}>{title}</Link>
            </h1>
            <ul>
                <li>
                    <Link to={PATH_HOME}>Home</Link>
                </li>
                <li>
                    <Link to={PATH_ABOUT}>About</Link>
                </li>
            </ul>
        </nav>
    );
};
Navbar.defaultProps = {
    title: 'Static Default Title'
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired
};

export default Navbar;
