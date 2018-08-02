import React from 'react';
import {NavLink} from 'react-router-dom';

import './social.scss';

const Social = () => (
    <div className='social'>
        <NavLink exact to='#' className='fa fa-facebook fa-lg'/>
        <NavLink exact to='#' className='fa fa-youtube-play fa-lg'/>
        <NavLink exact to='#' className='fa fa-twitter fa-lg'/>
    </div>
);

export default Social;