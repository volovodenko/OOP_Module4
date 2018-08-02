import React, {Component} from 'react';

import MenuMain from './MenuMain';
import Search from './Search'

import './menu.scss';


export default class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuFixed: false
        };

        this.handleScroll = ::this.handleScroll;
    }

    componentWillUnmount(){
        document.removeEventListener('scroll', this.handleScroll, false);
    }

    componentDidMount(){
        document.addEventListener('scroll', this.handleScroll, false);
    }



    render() {
        return (
            <nav className={'header-menu-wrapper' + (this.state.menuFixed ? ' fixed' : '')}>
                <div className='header-menu'>
                    {this.props.menuLoaded ? <MenuMain {...this.props} /> : null}
                    <Search {...this.props}/>
                </div>
            </nav>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

    handleScroll() {
        let currentScroll = window.pageYOffset;
        let headerHeight = document.getElementsByClassName('header-section')[0].clientHeight;

        if (currentScroll >= headerHeight && !this.state.menuFixed) {
            this.setState({
                menuFixed: true
            });
        }
        if (currentScroll < headerHeight && this.state.menuFixed) {
            this.setState({
                menuFixed: false
            });

        }
    }
}
