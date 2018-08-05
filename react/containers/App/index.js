import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import Modal from 'react-responsive-modal';
import './app.scss';


import {
    onLoginFormVisible, onLoginFormHide, onRegisterUser, onLoginUser, onValidateEmail
} from './actions';

const mapStateToProps = state => {
    return {
        loginFormVisible: state.app.loginFormVisible,

        emailExists: state.app.emailExists,
    };
};


@connect(
    mapStateToProps,
    {
        onLoginFormVisible, onLoginFormHide, onRegisterUser, onLoginUser, onValidateEmail
    },
    null,
    {pure: false}
)
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsSubscribeVisible: false,
            registerFormVisible: false,
            emailValid: false,
            nameValid: false,
            passwordValid: false,
            cPasswordValid: false
        };

        this.nameRegister = React.createRef();
        this.emailRegister = React.createRef();
        this.passwordRegister = React.createRef();
        this.cPasswordRegister = React.createRef();

        this.emailLogin = React.createRef();
        this.passwordLogin = React.createRef();
    }


    componentDidMount() {
        setTimeout(() => ::this.openNewsSubscribe(), 15000);
        window.onbeforeunload = () => 'Dialog text here';
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <Main/>
                <Footer/>

                <Modal open={this.state.newsSubscribeVisible}
                       onClose={::this.closeNewsSubscribe}
                       center
                       classNames={
                           {
                               overlay: 'modalOverlay',
                               modal: 'modalContent',
                               closeButton: 'closeButton',
                               closeIcon: 'closeIcon'

                           }
                       }
                >
                    <h3>Хочешь больше новостей? Подпишись на рассылку</h3>
                    <label>Имя:<input type='text'/></label>
                    <label>Фамилия:<input type='text'/></label>
                    <label>E-mail:<input type='email'/></label>
                    <button onClick={::this.closeNewsSubscribe} className='active'>Подписаться</button>
                </Modal>


                <Modal open={this.props.loginFormVisible}
                       onClose={::this.closeLoginForm}
                       center
                       classNames={
                           {
                               overlay: 'modalOverlay',
                               modal: 'modalContent',
                               closeButton: 'closeButton',
                               closeIcon: 'closeIcon'

                           }
                       }
                >
                    {this.state.registerFormVisible ? this.registerForm() : this.loginForm()}

                </Modal>

            </Fragment>
        );

    }

    /***************************************************************************
     *
     **************************************************************************/

    openNewsSubscribe() {
        if (!this.state.newsSubscribeVisible) {
            this.setState({newsSubscribeVisible: true});
        }
    }

    closeNewsSubscribe() {
        this.setState({newsSubscribeVisible: false});
    }

    closeLoginForm() {
        this.props.onLoginFormHide();

        setTimeout(() => {
            this.setState({
                registerFormVisible: false
            });
        }, 500)

    }

    openRegisterForm() {
        this.emailLogin.current.value = '';
        this.passwordLogin.current.value = '';

        this.setState(() => ({
            registerFormVisible: true
        }));


    }


    register() {
        if (!this.canRegister()) {
            return;
        }

        const data = {
            name: this.nameRegister.current.value,
            email: this.emailRegister.current.value,
            password: this.passwordRegister.current.value,
            c_password: this.cPasswordRegister.current.value,
        };

        this.props.onRegisterUser(data);
        this.closeLoginForm();

        this.setState({
            registerFormVisible: false,
            emailValid: false,
            nameValid: false,
            passwordValid: false,
            cPasswordValid: false
        });


    }


    login() {

        const data = {
            email: this.emailLogin.current.value,
            password: this.passwordLogin.current.value,
        };

        this.props.onLoginUser(data);

        this.closeLoginForm();
        location.reload();

    }

    loginForm() {
        return (
            <Fragment>
                <h3>Вход</h3>
                <label>E-mail:<input type='email' ref={this.emailLogin}/></label>
                <label>Password:<input type='password' ref={this.passwordLogin}/></label>
                <button onClick={::this.login} className='active'>Вход</button>
                <span onClick={::this.openRegisterForm}>Регистрация</span>
            </Fragment>
        )
    }


    validateEmail() {
        const re = /^[-._a-z0-9]+@[a-z0-9]+\.[a-z]+$/;
        const email = this.emailRegister.current.value.toLowerCase();

        if (
            re.test(email)
        ) {
            this.setState({
                emailValid: true
            });

            const data = {email};
            this.props.onValidateEmail(data);

            return;
        }

        this.setState({
            emailValid: false
        });

    }

    validateName() {
        const name = this.nameRegister.current.value.toLowerCase();

        name.length > 2
            ?
            this.setState({
                nameValid: true
            })
            :
            this.setState({
                nameValid: false
            });
    }

    validatePassword() {
        const password = this.passwordRegister.current.value;

        password.length > 4
            ?
            this.setState({
                passwordValid: true
            })
            :
            this.setState({
                passwordValid: false
            });
    }

    validateСPassword() {
        const password = this.passwordRegister.current.value;
        const cPassword = this.cPasswordRegister.current.value;

        cPassword.length > 4 && cPassword === password
            ?
            this.setState({
                cPasswordValid: true
            })
            :
            this.setState({
                cPasswordValid: false
            });
    }

    icons(state) {
        return state
            ? <i className='fa fa-check fa-lg ok' aria-hidden='true'/>
            : <i className='fa fa-times fa-lg warning' aria-hidden='true'/>
    }


    registerForm() {
        return (
            <Fragment>
                <h3>Регистрация</h3>

                <label>Name:
                    <input
                        type='text'
                        ref={this.nameRegister}
                        onChange={::this.validateName}
                        title={
                            !this.state.nameValid
                                ? 'Имя должно быть больше 2-х знаков'
                                : ''
                        }
                    />
                    {this.icons(this.state.nameValid)}

                </label>

                <label>E-mail:
                    <input
                        type='email'
                        onChange={::this.validateEmail}
                        ref={this.emailRegister}
                        title={
                            !this.state.emailValid
                                ? 'Недопустимый Email'
                                : this.props.emailExists
                                ? 'Такой e-mail уже существует'
                                : ''
                        }
                    />
                    {this.icons(this.state.emailValid && !this.props.emailExists)}
                </label>

                <label>Password:
                    <input
                        type='password'
                        onChange={::this.validatePassword}
                        ref={this.passwordRegister}
                        title={
                            !this.state.passwordValid
                                ? 'Пароль должен быть больше 4-х знаков'
                                : ''
                        }
                    />
                    {this.icons(this.state.passwordValid)}
                </label>

                <label>Confirm password:
                    <input
                        type='password'
                        onChange={::this.validateСPassword}
                        ref={this.cPasswordRegister}
                        title={
                            !this.state.cPasswordValid
                                ? 'Должен быть больше 4-х знаков и совпадать'
                                : ''
                        }
                    />
                    {this.icons(this.state.cPasswordValid)}
                </label>
                <button onClick={::this.register} className={this.canRegister() ? 'active' : ''}>Зарегистрироваться
                </button>
            </Fragment>
        )
    }

    canRegister() {
        return this.state.nameValid && this.state.emailValid && !this.props.emailExists
            && this.state.passwordValid && this.state.cPasswordValid;
    }
}