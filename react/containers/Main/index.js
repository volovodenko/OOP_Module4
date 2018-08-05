import React, {Component} from 'react';
import {connect} from 'react-redux';

import './main.scss';
import AsideTemplate from './AsideTemplate';
import Content from './Content';
import Loader from '../../components/Loader';
import {
    onGetBanners, onGetCategories, onGetSlider,
    onGetHomeNews, onGetCatNewsList, onGetArticle,
    onGetNewsListByTag,
    onSaveViews, onChangeVote, onSaveComment,
    onGetTop3ActiveArticle, onGetTop5Commentators
} from './actions';

const mapStateToProps = state => {
    return {
        bannersLoaded: state.main.bannersLoaded,
        bannersList: state.main.bannersList,

        categoriesList: state.main.categoriesList,
        categoriesLoaded: state.main.categoriesLoaded,

        sliderLoaded: state.main.sliderLoaded,
        sliderList: state.main.sliderList,
        sliderIsLoading: state.main.sliderIsLoading,

        homeNewsList: state.main.homeNewsList,
        homeNewsLoaded: state.main.homeNewsLoaded,
        homeNewsIsLoading: state.main.homeNewsIsLoading,

        catNewsLoaded: state.main.catNewsLoaded,
        catNewsList: state.main.catNewsList,
        catNewsIsLoading: state.main.catNewsIsLoading,

        articleLoaded: state.main.articleLoaded,
        articleLoadFail: state.main.articleLoadFail,
        article: state.main.article,
        articleIsLoading: state.main.articleIsLoading,
        tagsList: state.main.tagsList,
        commentsList: state.main.commentsList,

        newsListByTag: state.main.newsListByTag,
        newsListByTagLoaded: state.main.newsListByTagLoaded,
        newsListByTagLoadFail: state.main.newsListByTagLoadFail,
        newsListByTagIsLoading: state.main.newsListByTagIsLoading,

        loginRequest: state.app.loginRequest,
        loggedIn: state.app.loggedIn,
        userName: state.app.userName,
        userId: state.app.userId,

        savedCommentsList: state.main.savedCommentsList,
        commentSaved: state.main.commentSaved,

        top3ArticleList: state.main.top3ArticleList,
        top3ArticleLoaded: state.main.top3ArticleLoaded,

        top5CommentatorsList: state.main.top5CommentatorsList,
        top5CommentatorsLoaded: state.main.top5CommentatorsLoaded,
    };
};


@connect(
    mapStateToProps,
    {
        onGetBanners, onGetCategories, onGetSlider,
        onGetHomeNews, onGetCatNewsList, onGetArticle,
        onGetNewsListByTag,
        onSaveViews, onChangeVote, onSaveComment,
        onGetTop3ActiveArticle, onGetTop5Commentators
    },
    null,
    {pure: false}
)
export default class Main extends Component {
    bannersListLeft = [];
    bannersListRight = [];

    constructor(props) {
        super(props);

        this.props.onGetCategories();
        this.props.onGetBanners();

        this.shuffle = true;

    }


    render() {
        if (this.props.bannersLoaded) {
            this.shuffleArray(this.props.bannersList); //shuffle array of banners
        }

        return (
            <section className='main-wrapper'>
                <div className='main'>
                    <AsideTemplate bannersList={this.bannersListLeft} className={'main-asideLeft'}/>
                    {this.props.categoriesLoaded
                        ? <Content {...this.props}/>
                        : null
                    }
                    <AsideTemplate bannersList={this.bannersListRight} className={'main-asideRight'}/>
                </div>

                {
                    this.props.sliderIsLoading || this.props.homeNewsIsLoading || this.props.catNewsIsLoading
                    || this.props.articleIsLoading || this.props.newsListByTagIsLoading || this.props.loginRequest
                        ? <Loader/>
                        : null}

            </section>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

    shuffleArray(array) {

        if (this.shuffle) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }

            this.bannersListLeft = array.slice(0, 4);
            this.bannersListRight = array.slice(4, 8);
            this.shuffle = false;

            setTimeout(() => this.shuffle = true, 20000);
        }

    }
}