import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';

import './menuMain.scss';

export default class MenuMain extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: ''
        };
    }

    shouldComponentUpdate() {
        const currentCategory = location.pathname.split('/')[2];

        if (currentCategory !== this.state.category) {
            this.setState({
                category: currentCategory
            });

            return true;
        }

        return false;
    }

    render() {
        return (
            <ul className='header-menu__nav' ref='menu'>
                <li><NavLink exact to='/' activeClassName='active' className='fa fa-home'/></li>
                {this.menuRender()}
            </ul>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

    menuRender() {
        return this.props.menuList.map(item => (
            <li key={item.id}>
                <Link
                    to={+item.catId === 1 ? '#' : `/category/${item.link}`}
                    lnk={item.id} //custom attribute

                    //если часть uri соотвестсвует href, то делаем active
                    className={this.state.category === item.link ? 'active' : null}
                >
                    {item.title.toUpperCase()}
                </Link>
            </li>
        ));
    }
}