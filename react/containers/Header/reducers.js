const initialState = {
    menuList: [],
    menuIsLoading: false,
    menuLoaded: false,

    currencyList: [],
    currencyIsLoading: false,
    currencyLoaded: false,

    hotNewsList: [],
    hotNewsIsLoading: false,
    hotNewsLoaded: false,

    tagsList: [],
    tagsListIsLoading: false,
    tagsListLoaded: false,
};

//reducer
//A reducing function returns the new state of Redux store
//as any time the action will be created with dispatch, reducer will be called.
//at the first call 'stateStore = initialState' and result initialize Redux store with data in 'stateStore'
//at the second call 'stateStore' will come from Redux store
export default function headerReducer(stateStore = initialState, action) { //stateStore - previous state

    switch (action.type) {
        case 'MENU_FETCH_REQUEST':
            return Object.assign({}, stateStore, {menuIsLoading: true});
        case 'MENU_FETCH_SUCCESS':
            return Object.assign({}, stateStore, {menuList: action.payload, menuIsLoading: false, menuLoaded: true});
        case 'MENU_FETCH_FAIL':
            return Object.assign({}, stateStore, {menuIsLoading: false});

        /****************************************************************************/
        case 'CURRENCY_FETCH_REQUEST':
            return Object.assign({}, stateStore, {currencyIsLoading: true});
        case 'CURRENCY_FETCH_SUCCESS':
            return Object.assign(
                {},
                stateStore,
                {currencyList: action.payload, currencyIsLoading: false, currencyLoaded: true}
            );
        case 'CURRENCY_FETCH_FAIL':
            return Object.assign({}, stateStore, {currencyIsLoading: false});

        /****************************************************************************/
        case 'HOT_NEWS_FETCH_REQUEST':
            return Object.assign({}, stateStore, {hotNewsIsLoading: true});
        case 'HOT_NEWS_FETCH_SUCCESS':
            return Object.assign(
                {},
                stateStore,
                {hotNewsList: action.payload, hotNewsIsLoading: false, hotNewsLoaded: true}
            );
        case 'HOT_NEWS_FETCH_FAIL':
            return Object.assign({}, stateStore, {hotNewsIsLoading: false});

        /****************************************************************************/
        case 'TAGS_FOR_SEARCH_REQUEST':
            return Object.assign({}, stateStore, {tagsListIsLoading: true});
        case 'TAGS_FOR_SEARCH_FETCH_SUCCESS':
            return Object.assign(
                {},
                stateStore,
                {tagsList: action.payload, tagsListIsLoading: false, tagsListLoaded: true}
            );
        case 'TAGS_FOR_SEARCH_FETCH_FAIL':
            return Object.assign({}, stateStore, {tagsListIsLoading: false});

        /****************************************************************************/
        case 'CLEAR_TAGS_FOR_SEARCH':
            return Object.assign(
                {},
                stateStore,
                {tagsList: [], tagsListLoaded: false});

        /****************************************************************************/
        default:
            return stateStore;
    }

}
