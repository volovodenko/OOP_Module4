import React from 'react';
import {Link} from 'react-router-dom';

import './tags.scss';


const Tags = ({tagsList}) => tagsList.map((item, index) => (
    <li key={item.id}>
        <Link to={`/tags/${item.tag}.html`}>{item.tag}</Link>
        {index === tagsList.length - 1 ? '' : ','}
    </li>
));

export default Tags;

