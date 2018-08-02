import React, {Component} from 'react';

import './categoryList.scss';
import NotFound from '../../containers/Main/Content/NotFound';
import NewsList from '../../components/NewsList';
import Paginate from '../../components/Paginate';

export default class CategoryList extends Component {

    constructor(props) {
        super(props);

        this.setCurrentCategory();

        this.itemsCountPerPage = 5;

        this.state = {
            activePage: 1,
        };
    }


    shouldComponentUpdate(nextProps) {

        const currentCategoryLink = nextProps.location.match.params.category;

        if (!nextProps.catNewsLoaded) {
            return false;
        }

        if (currentCategoryLink !== this.currentCategoryLink) {
            this.setState({activePage: 1});
            this.setCurrentCategory();
            this.forceUpdate();
            return false;
        }

        return true;
    }


    render() {
        window.scrollTo(0, 0); //обнулить прокрутку

        if (!this.issetCategory()) {
            return <NotFound/>
        }

        if (!this.props.catNewsLoaded) {
            return null
        }

        this.totalItemsCount = this.props.catNewsList.length;

        return (
                <section className='newsList'>

                    <div>
                        <h2>
                            {this.currentCategory.title}
                        </h2>

                        <ul className='newsList-news'>
                            <NewsList
                                newsList={this.props.catNewsList}
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.itemsCountPerPage}
                            />
                        </ul>
                    </div>

                    <Paginate
                        totalItemsCount={this.totalItemsCount}
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.itemsCountPerPage}
                        onChange={::this.handlePageChange}
                    />

                </section>

        )

    }

    /***************************************************************************
     *
     **************************************************************************/

    issetCategory() {
        const category = this.props.categoriesList.filter(item => item.link === this.currentCategoryLink);

        return !!category.length;
    }

    setCurrentCategory() {
        this.currentCategoryLink = this.props.location.match.params.category;

        if (this.issetCategory()) {
            this.props.onGetCatNewsList(this.currentCategoryLink);
            this.currentCategory = this.getCurrentCategoryData();
        }
    }

    getCurrentCategoryData() {
        return this.props.categoriesList.filter(item => item.link === this.currentCategoryLink)[0];
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

}