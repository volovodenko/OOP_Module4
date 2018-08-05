import React, {Component, Fragment} from 'react';

import './article.scss';
import NotFound from '../../containers/Main/Content/NotFound';
import {getDate} from '../../helpers/getDate';
import {URL_IMG_ARTICLES} from '../../config';
import Tags from './Tags';
import PostComment from './PostComment';
import Comments from './Comments';

export default class Article extends Component {

    constructor(props) {
        super(props);

        const reading = this.selfRandom(1, 5);

        this.state = {
            views: 0,
            reading
        };

        this.setCurrentCategoryAndSlug();
    }

    componentDidMount() {
        window.scrollTo(0, 0); //обнулить прокрутку

        this.timerId = setInterval(() => {
            const reading = this.selfRandom(1, 5);
            const views = this.state.views + reading - 1; //-1 потому что себя не учитываем

            this.setState(() => ({
                reading,
                views
            }));

        }, 5000);

    }

    componentWillUnmount() {
        clearInterval(this.timerId);
        this.saveViews();
    }


    static getDerivedStateFromProps(props, state) {
        if (props.articleLoaded && state.views === 0) {
            return {
                views: +props.article.views + state.reading
            }
        }

        return null;
    }


    render() {

        if (!this.issetCategory() || this.props.articleLoadFail) {
            clearInterval(this.timerId);
            return <NotFound/>
        }

        if (!this.props.articleLoaded) {
            return null
        }


        const {article, tagsList} = this.props;

        return (
            <Fragment>
                <section className='article'>

                    <h3>
                        {article.title}
                    </h3>

                    <article>
                        <p>
                            {getDate(article.created_at)}
                            {+article.isAnalytic ? ' | (analytic)' : ''}
                        </p>
                        <img src={`${URL_IMG_ARTICLES}/${article.titleImg}`}/>
                        <p>{article.text}</p>
                    </article>

                    <footer>
                        <ul className='tags'>
                            <i className='fa fa-tags fa-flip-horizontal'/>
                            <Tags tagsList={tagsList}/>
                        </ul>

                        <div className='views'>
                            <span>Просмотров: {this.state.views}</span>
                            <span>Читают: {this.state.reading}</span>
                        </div>
                    </footer>

                </section>

                <PostComment {...this.props} articleId = {article.id}/>
                <Comments {...this.props}/>

            </Fragment>
        )

    }

    /***************************************************************************
     *
     **************************************************************************/

    issetCategory() {
        const category = this.props.categoriesList.filter(item => item.link === this.currentCategoryLink);

        return !!category.length;
    }

    setCurrentCategoryAndSlug() {
        this.currentCategoryLink = this.props.location.match.params.category;
        this.currentSlug = this.props.location.match.params.slug;

        if (this.issetCategory()) {
            this.props.onGetArticle(this.currentCategoryLink, this.currentSlug);
        }
    }

    selfRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    saveViews() {
        const data = {
            views: this.state.views,
            newsId: this.props.article.id
        };

        this.props.onSaveViews(data);
    }


}