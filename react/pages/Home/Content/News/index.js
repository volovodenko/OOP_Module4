import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './news.scss';

export default class News extends Component {

    render() {
        return this.props.homeNewsList.map(item => (
            <li key={item.id} className={+item.isHot ? 'hot' : ''}>
                <p>
                    {this.getDate(item.created_at)}
                    {+item.isHot ? ' | Горячая новость' : ''}
                    {+item.isAnalytic ? ' | (analytic)' : ''}
                </p>
                <Link to={`/category/${this.props.link}/${item.slug}`}>
                    {item.title}
                </Link>
            </li>
        ));


    }

    /***************************************************************************
     *
     **************************************************************************/

    getDate(date) {
        const d = new Date(date);
        const month = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
        const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

        return `${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()} | ${d.getHours()}:${minutes}`;
    }
}