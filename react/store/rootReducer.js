import {combineReducers} from 'redux';


import header from '../containers/Header/reducers';
import main from '../containers/Main/reducers';
import app from '../containers/App/reducers';

export default combineReducers(
    {
        header,
        main,
        app
    }
)

