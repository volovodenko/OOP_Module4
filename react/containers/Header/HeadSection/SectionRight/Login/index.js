import React, {Component} from 'react';

import './login.scss';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropDownLogoutVisible: false
        };

        this.login = React.createRef();

        this.handleClickOutside = ::this.handleClickOutside;
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }


    render() {
        return (
            <div className='login' ref={this.login}>
                {
                    !this.props.loggedIn
                        ?
                        <span onClick={::this.loginVisible}>войти</span>
                        :
                        <span onClick={::this.toggleLogout}>
                            {this.props.userName}
                            <i className='fa fa-caret-down' aria-hidden='true'/>
                        </span>
                }

                {this.state.dropDownLogoutVisible ? this.renderDropDownLogout() : null}
            </div>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

    handleClickOutside(e) {
        if (!e.composedPath().includes(this.login.current) && this.state.dropDownLogoutVisible) {
            this.toggleLogout();
        }
    }


    loginVisible() {
        this.props.onLoginFormVisible();
    }

    toggleLogout() {
        this.setState({
            dropDownLogoutVisible: !this.state.dropDownLogoutVisible
        })
    }

    logout() {
        this.toggleLogout();
        this.props.onLogoutUser();
        location.reload();
    }

    renderDropDownLogout() {
        return (
            <div className='logout'>
                <span onClick={::this.logout}>Logout<i className='fa fa-sign-out' aria-hidden='true'/></span>
            </div>
        )
    }
}