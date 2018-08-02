import React, {Component} from 'react';
import {connect} from 'react-redux';

import './header.scss';
import HeadSection from './HeadSection';
import Menu from './Menu';
import {onGetMenu, onGetCurrency, onGetHotNews, onGetTagsForSearch, onClearTagsForSearch} from './actions';
import {onLoginFormVisible, onLogoutUser} from '../App/actions';

const mapStateToProps = state => {
    return {
        menuLoaded: state.header.menuLoaded,
        menuList: state.header.menuList,

        currencyList: state.header.currencyList,
        currencyLoaded: state.header.currencyLoaded,

        hotNewsList: state.header.hotNewsList,
        hotNewsLoaded: state.header.hotNewsLoaded,

        tagsList: state.header.tagsList,
        tagsListLoaded: state.header.tagsListLoaded,

        userName: state.app.userName,
        loggedIn: state.app.loggedIn
    };
};

@connect(
    mapStateToProps,
    {
        onGetMenu, onGetCurrency, onGetHotNews, onGetTagsForSearch, onClearTagsForSearch,
        onLoginFormVisible, onLogoutUser
    },
    null,
    {pure: false}
)
export default class Header extends Component {

    constructor(props) {
        super(props);

        this.props.onGetMenu();
        this.props.onGetHotNews();
        this.props.onGetCurrency(); //get currencyList

    }

    render() {
        return (
            <header className='header'>
                <HeadSection {...this.props}/>
                <Menu {...this.props} />
            </header>
        )
    }
}
