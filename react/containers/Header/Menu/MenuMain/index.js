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
            <nav className='header-menu__nav'>
                <ul>
                    <li><NavLink exact to='/' activeClassName='active' className='fa fa-home'/></li>
                    {this.menuRender()}
                </ul>
            </nav>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

    menuRender() {
        const menuList = this.props.menuList.filter(item => +item.pId === 0);

        return menuList.map(item => (
            <li key={item.id}>
                <Link
                    to={+item.catId === 1 ? '#' : `/category/${item.link}`}
                    lnk={item.id} //custom attribute

                    //если часть uri соотвестсвует href, то делаем active
                    className={this.state.category === item.link ? 'active' : null}
                >
                    {item.title.toUpperCase()}
                    {+item.catId === 1 ? <i className='fa fa-caret-down fa-lg' aria-hidden='true'/> : null}
                </Link>

                {+item.catId === 1 ? this.subMenuRender(+item.id) : null}
            </li>
        ));
    }


    subMenuRender(id) {

        const subMenuList = this.props.menuList.filter(item => +item.pId === id);

        return (
            <ul className='subMenu'>
                {
                    subMenuList.map(item => (
                        <li key={item.id}>
                            <Link
                                to={+item.catId === 1 ? '#' : `/category/${item.link}`}
                            >
                                {item.title.toUpperCase()}
                                {+item.catId === 1 ? <i className='fa fa-caret-right' aria-hidden='true'/> : null}
                            </Link>
                            {+item.catId === 1 ? this.subMenuRender(+item.id) : null}
                        </li>
                    ))
                }
            </ul>
        )


    }
}