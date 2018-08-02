import React, {Component} from 'react';

import Banner from './Banner/index';

export default class BannersTemplate extends Component {

    render() {
        const className = this.props.className;

        return this.props.bannersList.map(function(item){
            return (
                <Banner data={item} key={item.id} className={className}/>
            )
        });
    }
}