import React from 'react';
import {Link} from 'react-router-dom';
import {getDate} from '../../helpers/getDate';


const NewsList = ({newsList, activePage, itemsCountPerPage}) => {
    const from = (activePage - 1) * itemsCountPerPage;
    const to = from + itemsCountPerPage;
    const newsListSlice = newsList.slice(from, to);

    return newsListSlice.map(item => (
        <li key={item.id} className={+item.isHot ? 'hot' : ''}>
            <p>
                {getDate(item.created_at)}
                {+item.isHot ? ' | Горячая новость' : ''}
                {+item.isAnalytic ? ' | (analytic)' : ''}
            </p>
            <Link to={`/category/${item.link}/${item.slug}`}>
                {item.title}
            </Link>
        </li>
    ))
};

export default NewsList;
