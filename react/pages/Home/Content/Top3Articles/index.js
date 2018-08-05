import React, {Component} from 'react';


import './top3Articles.scss';
import News from '../News';

export default class Top3Articles extends Component {

    render() {
        return (
            <section className='home-top3articles'>
                <h2>top 3 articles</h2>

                <ul className='home-category_news'>
                    <News
                        homeNewsList={this.props.top3ArticleList}
                    />
                </ul>

            </section>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

}