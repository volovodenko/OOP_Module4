const initialState = {
    bannersList: [],
    bannersIsLoading: false,
    bannersLoaded: false,

    categoriesList: [],
    categoriesIsLoading: false,
    categoriesLoaded: false,

    sliderList: [],
    sliderIsLoading: false,
    sliderLoaded: false,

    homeNewsList: [],
    homeNewsIsLoading: false,
    homeNewsLoaded: false,

    catNewsList: [],
    catNewsIsLoading: false,
    catNewsLoaded: false,

    article: {},
    tagsList: [],
    articleIsLoading: false,
    articleLoaded: false,
    articleLoadFail: false,

    newsListByTag: [],
    newsListByTagIsLoading: false,
    newsListByTagLoaded: false,
    newsListByTagLoadFail: false,

};

//reducer
//A reducing function returns the new state of Redux store
//as any time the action will be created with dispatch, reducer will be called.
//at the first call 'stateStore = initialState' and result initialize Redux store with data in 'stateStore'
//at the second call 'stateStore' will come from Redux store
export default function mainReducer(stateStore = initialState, action) { //stateStore - previous state

    switch (action.type) {
        case 'BANNERS_FETCH_REQUEST':
            return Object.assign({}, stateStore, {bannersIsLoading: true});
        case 'BANNERS_FETCH_SUCCESS':
            return Object.assign({}, stateStore, {
                bannersList: action.payload,
                bannersIsLoading: false,
                bannersLoaded: true
            });
        case 'BANNERS_FETCH_FAIL':
            return Object.assign({}, stateStore, {bannersIsLoading: false});

        /****************************************************************************/
        case 'CATEGORIES_LIST_FETCH_REQUEST':
            return Object.assign({}, stateStore, {categoriesIsLoading: true});
        case 'CATEGORIES_LIST_FETCH_SUCCESS':
            return Object.assign({}, stateStore, {
                categoriesList: action.payload,
                categoriesIsLoading: false,
                categoriesLoaded: true
            });
        case 'CATEGORIES_LIST_FETCH_FAIL':
            return Object.assign({}, stateStore, {categoriesIsLoading: false});

        /****************************************************************************/
        case 'SLIDER_FETCH_REQUEST':
            return Object.assign({}, stateStore, {sliderIsLoading: true});
        case 'SLIDER_FETCH_SUCCESS':
            return Object.assign({}, stateStore, {
                sliderList: action.payload,
                sliderIsLoading: false,
                sliderLoaded: true
            });
        case 'SLIDER_FETCH_FAIL':
            return Object.assign({}, stateStore, {sliderIsLoading: false});

        /****************************************************************************/
        case 'HOME_NEWS_FETCH_REQUEST':
            return Object.assign({}, stateStore, {
                homeNewsIsLoading: true,

                articleLoaded: false,
            });
        case 'HOME_NEWS_FETCH_SUCCESS':
            return Object.assign({}, stateStore, {
                homeNewsList: action.payload,
                homeNewsIsLoading: false,
                homeNewsLoaded: true
            });
        case 'HOME_NEWS_FETCH_FAIL':
            return Object.assign({}, stateStore, {homeNewsIsLoading: false});

        /****************************************************************************/
        case 'CATEGORY_NEWS_LIST_FETCH_REQUEST':
            return Object.assign({}, stateStore, {
                catNewsIsLoading: true,
                articleLoadFail: false,
                catNewsLoaded: false,

                articleLoaded: false
            });
        case 'CATEGORY_NEWS_LIST_FETCH_SUCCESS':
            return Object.assign({}, stateStore, {
                catNewsList: action.payload,
                catNewsIsLoading: false,
                catNewsLoaded: true
            });
        case 'CATEGORY_NEWS_LIST_FETCH_FAIL':
            return Object.assign({}, stateStore, {catNewsIsLoading: false, articleLoadFail: true});

        /****************************************************************************/
        case 'ARTICLE_FETCH_REQUEST':
            return Object.assign({}, stateStore, {
                articleIsLoading: true,
                articleLoadFail: false,
                articleLoaded: false,

                catNewsLoaded: false,
            });
        case 'ARTICLE_FETCH_SUCCESS':
            return Object.assign({}, stateStore, {
                article: action.payload[0],
                tagsList: action.payload[1],
                articleIsLoading: false,
                articleLoaded: true
            });
        case 'ARTICLE_FETCH_FAIL':
            return Object.assign({}, stateStore, {articleIsLoading: false, articleLoadFail: true});

        /****************************************************************************/
        case 'NEWS_LIST_BY_TAG_FETCH_REQUEST':
            return Object.assign({}, stateStore, {
                newsListByTagIsLoading: true,
                newsListByTagLoadFail: false,
                newsListByTagLoaded: false,
            });
        case 'NEWS_LIST_BY_TAG_FETCH_SUCCESS':
            return Object.assign({}, stateStore, {
                newsListByTag: action.payload,
                newsListByTagIsLoading: false,
                newsListByTagLoaded: true
            });
        case 'NEWS_LIST_BY_TAG_FETCH_FAIL':
            return Object.assign({}, stateStore, {newsListByTagIsLoading: false, newsListByTagLoadFail: true});

        /****************************************************************************/

        default:
            return stateStore;
    }

}
