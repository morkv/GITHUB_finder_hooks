import React, { Fragment } from 'react';

const APP_HEADING_TITLE = 'About This App';
const APP_DESCRIPTION_TITLE = 'App to PornHub users';
const APP_VERSION = '1.0.0';
const APP_VERSION_TITLE = `Version: ${APP_VERSION}`;

const About = () => {
    return (
        <Fragment>
            <h2>{APP_HEADING_TITLE}</h2>
            <p>{APP_DESCRIPTION_TITLE}</p>
            <p>{APP_VERSION_TITLE}</p>
        </Fragment>
    );
};

export default About;
