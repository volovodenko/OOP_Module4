const initialState = {
    loginFormVisible: false,

    loginRequest: false,
    token: localStorage.getItem('JWT') ? localStorage.getItem('JWT') : '',
    userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
    loggedIn: localStorage.getItem('loggedIn') ? !!localStorage.getItem('loggedIn') : false,

    emailExists: true,

};

//reducer
//A reducing function returns the new state of Redux store
//as any time the action will be created with dispatch, reducer will be called.
//at the first call 'stateStore = initialState' and result initialize Redux store with data in 'stateStore'
//at the second call 'stateStore' will come from Redux store
export default function appReducer(stateStore = initialState, action) { //stateStore - previous state

    switch (action.type) {
        case 'LOGIN_VISIBLE':
            return Object.assign({}, stateStore, {loginFormVisible: true});

        /****************************************************************************/
        case 'LOGIN_HIDE':
            return Object.assign({}, stateStore, {loginFormVisible: false});

        /****************************************************************************/
        case 'REGISTER_USER_REQUEST':
        case 'LOGIN_USER_REQUEST':
            return Object.assign({}, stateStore, {loginRequest: true});
        case 'REGISTER_USER_SUCCESS':
        case 'LOGIN_USER_SUCCESS':
            //запись в localStorage
            localStorage.setItem('JWT', action.payload.token);
            localStorage.setItem('userName', action.payload.name);
            localStorage.setItem('loggedIn', '1');

            return Object.assign(
                {},
                stateStore,
                {
                    loginRequest: false,
                    loggedIn: true,
                    userName: action.payload.name,
                    token: action.payload.token
                }
            );
        case 'REGISTER_USER_FAIL':
        case 'LOGIN_USER_FAIL':
            return Object.assign({}, stateStore, {loginRequest: false});

        /****************************************************************************/
        case 'LOGOUT_USER':
            //Очистка localStorage
            localStorage.clear();

            return Object.assign(
                {},
                stateStore,
                {
                    loggedIn: false,
                    userName: '',
                    token: ''
                }
            );
        /****************************************************************************/
        case 'VALIDATE_EMAIL_REQUEST':
            return Object.assign({}, stateStore, {emailExists: true});
        case 'VALIDATE_EMAIL_SUCCESS':
            return Object.assign({}, stateStore, {emailExists: false});
        case 'VALIDATE_EMAIL_FAIL':
            return Object.assign({}, stateStore, {emailExists: true});
        /****************************************************************************/

        default:
            return stateStore;
    }

}
