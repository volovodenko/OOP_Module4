import React, {Component} from 'react';

import './asideTemplate.scss';
import BannersTemplate from './BannersTemplate';

export default class AsideTemplate extends Component {

    render() {
        return (
            <aside className={this.props.className}>
                <BannersTemplate bannersList={this.props.bannersList} className={this.props.className}/>
            </aside>
        )
    }
}