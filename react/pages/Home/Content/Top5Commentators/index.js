import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './top5Commentators.scss';

export default class Top5Commentators extends Component {

    render() {
        return (
            <section className='home-top5commentators'>
                <h2>top 5 commentators</h2>

                <ul>
                    {this.top5CommentatorsTemplate()}
                </ul>

            </section>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

    top5CommentatorsTemplate(){
        return this.props.top5CommentatorsList.map(item => (
            <li key={+item.id}>
                <Link to={`/user/${item.name}-${item.id}.html`}>
                    {item.name}
                </Link>
                :&nbsp;{item.count} comments
            </li>
        ));
    }

}