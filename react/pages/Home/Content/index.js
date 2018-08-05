import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './content.scss';
import News from './News';
import Top3Articles from './Top3Articles';
import Top5Commentators from './Top5Commentators';

export default class Content extends Component {

    render() {
        return (
            <section className='home'>
                {this.homeNewsTemplate()}
                {this.props.top3ArticleLoaded ? <Top3Articles {...this.props}/> : null}
                {this.props.top5CommentatorsLoaded ? <Top5Commentators {...this.props} /> : null}
            </section>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/
    homeNewsTemplate() {
        return this.props.categoriesList.map(item => (
            <div key={item.id} className='home-category'>
                <h2>
                    <Link to={`/${item.link}`}>
                        {item.title}
                    </Link>
                </h2>
                <ul className='home-category_news'>
                    <News
                        homeNewsList={this.getCurrentCatNews(item.id)}
                    />
                </ul>
            </div>
        ));
    }

    getCurrentCatNews(catId) {
        let news = this.props.homeNewsList.filter((item) => {
            if (+catId === 7) { //аналитика
                return !!+item[0].isAnalytic;
            }

            return item[0].category_id === catId;
        });

        return news[0];
    }
}