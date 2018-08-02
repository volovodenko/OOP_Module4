import {checkResponse, httpRequest} from '../../helpers/network';

/*************************************************************************
 * Login Visible
 *************************************************************************/
const loginFormVisible = () => ({
    type: 'LOGIN_VISIBLE'
});

export const onLoginFormVisible = () => dispatch => {
    dispatch(loginFormVisible());
};

/*************************************************************************
 * Login Hide
 *************************************************************************/
const loginFormHide = () => ({
    type: 'LOGIN_HIDE'
});

export const onLoginFormHide = () => dispatch => {
    dispatch(loginFormHide());
};

/*************************************************************************
 * REGISTER USER
 *************************************************************************/
const registerUserRequest = () => ({
    type: 'REGISTER_USER_REQUEST'
});


const registerUserSuccess = (data) => ({
    type: 'REGISTER_USER_SUCCESS',
    payload: data
});

const registerUserFail = (data) => ({
    type: 'REGISTER_USER_FAIL',
    payload: data
});

export const onRegisterUser = (data) => dispatch => {
    dispatch(registerUserRequest());

    httpRequest('register', 'POST', data)
        .then(res => {
            if (checkResponse(res)) {
                dispatch(registerUserSuccess(res.data.success));
            }
        })
        .catch(err => {
            dispatch(registerUserFail(err.response.data.error));
        });

};


/*************************************************************************
 * LOGIN USER
 *************************************************************************/
const loginUserRequest = () => ({
    type: 'LOGIN_USER_REQUEST'
});


const loginUserSuccess = (data) => ({
    type: 'LOGIN_USER_SUCCESS',
    payload: data
});

const loginUserFail = (data) => ({
    type: 'LOGIN_USER_FAIL',
    payload: data
});

export const onLoginUser = (data) => dispatch => {
    dispatch(loginUserRequest());

    httpRequest('login', 'POST', data)
        .then(res => {
            if (checkResponse(res)) {
                dispatch(loginUserSuccess(res.data.success));
            }
        })
        .catch(err => {
            dispatch(loginUserFail(err.response.data.error));
        });

};

/*************************************************************************
 * LOGOUT USER
 *************************************************************************/
const logoutUser = () => ({
    type: 'LOGOUT_USER'
});


export const onLogoutUser = () => dispatch => {
    dispatch(logoutUser());
};

/*************************************************************************
 * VALIDATE EMAIL
 *************************************************************************/
const validateEmailRequest = () => ({
    type: 'VALIDATE_EMAIL_REQUEST'
});

const validateEmailSuccess = () => ({
    type: 'VALIDATE_EMAIL_SUCCESS'
});

const validateEmailFail = () => ({
    type: 'VALIDATE_EMAIL_FAIL'
});


export const onValidateEmail = (data) => dispatch => {
    dispatch(validateEmailRequest());

    httpRequest('validateEmail', 'POST', data)
        .then(res => {
            if (checkResponse(res)) {
                +res.data.message
                    ? dispatch(validateEmailSuccess())
                    : dispatch(validateEmailFail());
            }
        })
        .catch(() => {
            dispatch(validateEmailFail());
        });
};
