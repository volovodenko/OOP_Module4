import {httpRequest, checkResponse} from '../../helpers/network';

/*************************************************************************
 * GET IMAGE FOR BANNERS
 *************************************************************************/
const bannersFetchRequest = () => ({
    type: 'BANNERS_FETCH_REQUEST'
});

const bannersFetchSuccess = (data) => ({
    type: 'BANNERS_FETCH_SUCCESS',
    payload: data
});

const bannersFetchFail = (error) => ({
    type: 'BANNERS_FETCH_FAIL',
    payload: error
});


export const onGetBanners = () => dispatch => {
    dispatch(bannersFetchRequest());

    httpRequest('b')
        .then(res => {
            if (checkResponse(res)) {
                dispatch(bannersFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(bannersFetchFail(err));
        });
};

/*************************************************************************
 * GET CATEGORIES LIST
 *************************************************************************/
const catListFetchRequest = () => ({
    type: 'CATEGORIES_LIST_FETCH_REQUEST'
});

const catListFetchSuccess = (data) => ({
    type: 'CATEGORIES_LIST_FETCH_SUCCESS',
    payload: data
});

const catListFetchFail = (error) => ({
    type: 'CATEGORIES_LIST_FETCH_FAIL',
    payload: error
});

export const onGetCategories = () => dispatch => {
    dispatch(catListFetchRequest());

    httpRequest('getCat')
        .then(res => {
            if (checkResponse(res)) {
                dispatch(catListFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(catListFetchFail(err));
        });
};

/*************************************************************************
 * GET SLIDER
 *************************************************************************/
const sliderFetchRequest = () => ({
    type: 'SLIDER_FETCH_REQUEST'
});

const sliderFetchSuccess = (data) => ({
    type: 'SLIDER_FETCH_SUCCESS',
    payload: data
});

const sliderFetchFail = (error) => ({
    type: 'SLIDER_FETCH_FAIL',
    payload: error
});

export const onGetSlider = () => dispatch => {
    dispatch(sliderFetchRequest());

    httpRequest('slider')
        .then(res => {
            if (checkResponse(res)) {
                dispatch(sliderFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(sliderFetchFail(err));
        });
};



/*************************************************************************
 * GET HOME NEWS
 *************************************************************************/
const homeNewsFetchRequest = () => ({
    type: 'HOME_NEWS_FETCH_REQUEST'
});

const homeNewsFetchSuccess = (data) => ({
    type: 'HOME_NEWS_FETCH_SUCCESS',
    payload: data
});

const homeNewsFetchFail = (error) => ({
    type: 'HOME_NEWS_FETCH_FAIL',
    payload: error
});

export const onGetHomeNews = () => dispatch => {
    dispatch(homeNewsFetchRequest());

    httpRequest('homeNews')
        .then(res => {
            if (checkResponse(res)) {
                dispatch(homeNewsFetchSuccess(res.data));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(homeNewsFetchFail(err));
        });
};

/*************************************************************************
 * GET CATEGORIES NEWS LIST
 *************************************************************************/
const catNewsListFetchRequest = () => ({
    type: 'CATEGORY_NEWS_LIST_FETCH_REQUEST'
});

const catNewsListFetchSuccess = (data) => ({
    type: 'CATEGORY_NEWS_LIST_FETCH_SUCCESS',
    payload: data
});


const catNewsListFetchFail = (error) => ({
    type: 'CATEGORY_NEWS_LIST_FETCH_FAIL',
    payload: error
});


export const onGetCatNewsList = (category) => dispatch => {
    dispatch(catNewsListFetchRequest());

    const url = `catNews/${category}`;

    httpRequest(url)
        .then(res => {
            if (checkResponse(res)) {
                dispatch(catNewsListFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(catNewsListFetchFail(err.response.data.message));
        });
};

/*************************************************************************
 * GET ARTICLE
 *************************************************************************/

const articleFetchRequest = () => ({
    type: 'ARTICLE_FETCH_REQUEST'
});

const articleFetchSuccess = (data) => ({
    type: 'ARTICLE_FETCH_SUCCESS',
    payload: data
});

const articleFetchFail = (error) => ({
    type: 'ARTICLE_FETCH_FAIL',
    payload: error
});

export const onGetArticle = (category, slug) => dispatch => {
    dispatch(articleFetchRequest());

    const url = `catNews/${category}/${slug}`;

    httpRequest(url)
        .then(res => {
            if (checkResponse(res)) {
                dispatch(articleFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(articleFetchFail(err.response.data.message));
        });
};


/*************************************************************************
 * GET NEWS LIST BY TAG
 *************************************************************************/
const newsListByTagFetchRequest = () => ({
    type: 'NEWS_LIST_BY_TAG_FETCH_REQUEST'
});

const newsListByTagFetchSuccess = (data) => ({
    type: 'NEWS_LIST_BY_TAG_FETCH_SUCCESS',
    payload: data
});


const newsListByTagFetchFail = (error) => ({
    type: 'NEWS_LIST_BY_TAG_FETCH_FAIL',
    payload: error
});


export const onGetNewsListByTag = (tag) => dispatch => {
    dispatch(newsListByTagFetchRequest());

    const url = `tagNews/${tag}`;

    httpRequest(url)
        .then(res => {
            if (checkResponse(res)) {
                dispatch(newsListByTagFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(newsListByTagFetchFail(err.response.data.message));
        });
};


/*************************************************************************
 * SAVE VIEWS
 *************************************************************************/
const saveViewsPost = () => ({
    type: 'SAVE_VIEWS_POST'
});

const saveViewsPostSuccess = () => ({
    type: 'SAVE_VIEWS_POST_SUCCESS'
});

const saveViewsPostFail = () => ({
    type: 'SAVE_VIEWS_POST_FAIL'
});


export const onSaveViews = (data) => dispatch => {
    dispatch(saveViewsPost());

    const url = 'saveViews';

    httpRequest(url, 'POST', data)
        .then(res => {
            if (checkResponse(res)) {
                dispatch(saveViewsPostSuccess());
            }
        })
        .catch(() => {
            dispatch(saveViewsPostFail());
        });
};


/*************************************************************************
 * VOTE CHANGE
 *************************************************************************/
const voteUpsRequest = () => ({
    type: 'VOTE_CHANGE_REQUEST'
});

const voteUpsSuccess = () => ({
    type: 'VOTE_CHANGE_SUCCESS'
});

const voteUpsFail = () => ({
    type: 'VOTE_CHANGE_FAIL'
});


export const onChangeVote = (data) => dispatch => {
    dispatch(voteUpsRequest());

    const url = 'vote/save';

    httpRequest(url, 'POST', data)
        .then(res => {
            if (checkResponse(res)) {
                dispatch(voteUpsSuccess());
            }
        })
        .catch(() => {
            dispatch(voteUpsFail());
        });
};


/*************************************************************************
 * SAVE COMMENT
 *************************************************************************/
const saveCommentRequest = () => ({
    type: 'SAVE_COMMENT_REQUEST'
});

const saveCommentSuccess = (data) => ({
    type: 'SAVE_COMMENT_SUCCESS',
    payload: data
});

const saveCommentFail = () => ({
    type: 'SAVE_COMMENT_FAIL'
});


export const onSaveComment = (data) => dispatch => {
    dispatch(saveCommentRequest());

    const url = 'comment/save';

    const dataSend = {
        news_id: data.news_id,
        text: data.text,
    };

    httpRequest(url, 'POST', dataSend)
        .then(res => {
            if (checkResponse(res)) {
                dispatch(saveCommentSuccess(data));
            }
        })
        .catch(() => {
            dispatch(saveCommentFail());
        });
};


/*************************************************************************
 * GET TOP 3 ACTIVE ARTICLE
 *************************************************************************/
const top3ActiveArticleFetchRequest = () => ({
    type: 'TOP_3_ACTIVE_ARTICLE_FETCH_REQUEST'
});

const top3ActiveArticleFetchSuccess = (data) => ({
    type: 'TOP_3_ACTIVE_ARTICLE_FETCH_SUCCESS',
    payload: data
});

const top3ActiveArticleFetchFail = (error) => ({
    type: 'TOP_3_ACTIVE_ARTICLE_FETCH_FAIL',
    payload: error
});


export const onGetTop3ActiveArticle = () => dispatch => {
    dispatch(top3ActiveArticleFetchRequest());

    httpRequest('top3news')
        .then(res => {
            if (checkResponse(res)) {
                dispatch(top3ActiveArticleFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(top3ActiveArticleFetchFail(err));
        });
};



/*************************************************************************
 * GET TOP 5 COMMENTATORS
 *************************************************************************/
const top5CommentatorsFetchRequest = () => ({
    type: 'TOP_5_COMMENTATORS_FETCH_REQUEST'
});

const top5CommentatorsFetchSuccess = (data) => ({
    type: 'TOP_5_COMMENTATORS_FETCH_SUCCESS',
    payload: data
});

const top5CommentatorsFetchFail = (error) => ({
    type: 'TOP_5_COMMENTATORS_FETCH_FAIL',
    payload: error
});


export const onGetTop5Commentators = () => dispatch => {
    dispatch(top5CommentatorsFetchRequest());

    httpRequest('top5commentators')
        .then(res => {
            if (checkResponse(res)) {
                dispatch(top5CommentatorsFetchSuccess(res.data));
            }
        })
        .catch(err => {
            dispatch(top5CommentatorsFetchFail(err));
        });
};