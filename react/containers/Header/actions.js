import {httpRequest, checkResponse} from '../../helpers/network';

/*************************************************************************
 * GET MENU LIST FROM SERVER
 *************************************************************************/
const menuFetchRequest = () => ({
    type: 'MENU_FETCH_REQUEST'
});

const menuFetchSuccess = (data) => ({
    type: 'MENU_FETCH_SUCCESS',
    payload: data
});

const menuFetchFail = (error) => ({
    type: 'MENU_FETCH_FAIL',
    payload: error
});

export const onGetMenu = () => dispatch => {
    dispatch(menuFetchRequest());

    httpRequest('menu')
        .then(res => {
            if (checkResponse(res)) {
                dispatch(menuFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(menuFetchFail(err));
        });
};

/*************************************************************************
 * GET CURRENCY
 *************************************************************************/
const currencyFetchRequest = () => ({
    type: 'CURRENCY_FETCH_REQUEST'
});

const currencyFetchSuccess = (data) => ({
    type: 'CURRENCY_FETCH_SUCCESS',
    payload: data
});

const currencyFetchFail = (error) => ({
    type: 'CURRENCY_FETCH_FAIL',
    payload: error
});


export const onGetCurrency = () => dispatch => {
    dispatch(currencyFetchRequest());

    httpRequest('currency')
        .then(res => {
            if (checkResponse(res)) {
                dispatch(currencyFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(currencyFetchFail(err));
        });
};

/*************************************************************************
 * GET HOT NEWS
 *************************************************************************/
const hotNewsFetchRequest = () => ({
    type: 'HOT_NEWS_FETCH_REQUEST'
});

const hotNewsFetchSuccess = (data) => ({
    type: 'HOT_NEWS_FETCH_SUCCESS',
    payload: data
});

const hotNewsFetchFail = (error) => ({
    type: 'HOT_NEWS_FETCH_FAIL',
    payload: error
});


export const onGetHotNews = () => dispatch => {
    dispatch(hotNewsFetchRequest());

    httpRequest('hotNews')
        .then(res => {
            if (checkResponse(res)) {
                dispatch(hotNewsFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(hotNewsFetchFail(err));
        });
};


/*************************************************************************
 * GET TAGS FOR SEARCH
 *************************************************************************/
const tagsForSearchRequest = () => ({
    type: 'TAGS_FOR_SEARCH_REQUEST'
});

const tagsForSearchSuccess = (data) => ({
    type: 'TAGS_FOR_SEARCH_FETCH_SUCCESS',
    payload: data
});

const tagsForSearchFetchFail = (error) => ({
    type: 'TAGS_FOR_SEARCH_FETCH_FAIL',
    payload: error
});


export const onGetTagsForSearch = (tag) => dispatch => {
    dispatch(tagsForSearchRequest());

    httpRequest(`getTags/${tag}`)
        .then(res => {
            if (checkResponse(res)) {
                dispatch(tagsForSearchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(tagsForSearchFetchFail(err));
        });
};

/*************************************************************************
 * CLEAR TAGS FOR SEARCH
 *************************************************************************/
const clearTagsForSearch = () => ({
    type: 'CLEAR_TAGS_FOR_SEARCH'
});


export const onClearTagsForSearch = () => dispatch => {
    dispatch(clearTagsForSearch());
};
