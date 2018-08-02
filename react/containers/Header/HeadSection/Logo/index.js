import React from 'react';
import {NavLink} from 'react-router-dom';

import './logo.scss';

const Logo = ()=> (
    <div className='header-section_logo'>
        <h1><NavLink exact to='/'>Fake News</NavLink></h1>
    </div>
);

export default Logo;
