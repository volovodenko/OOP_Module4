import React, {Component} from 'react';

import './newsByTag.scss';
import NotFound from '../../containers/Main/Content/NotFound';
import Paginate from '../../components/Paginate';
import NewsList from '../../components/NewsList';

export default class NewsByTag extends Component {
    constructor(props) {
        super(props);

        this.props.onGetNewsListByTag(this.props.tag);

        this.itemsCountPerPage = 5;

        this.state = {
            activePage: 1,
        };

        this.tag = this.props.tag;
    }


    shouldComponentUpdate(nextProps){

        if(this.tag !== nextProps.tag) {

            this.setState({activePage: 1});
            this.tag = nextProps.tag;
            this.props.onGetNewsListByTag(this.tag);

            return false;
        }

        return true;
    }

    render() {
        window.scrollTo(0, 0); //обнулить прокрутку

        if (this.props.newsListByTagLoadFail) { //если такого тега нет, то 404
            return <NotFound/>
        }

        if (!this.props.newsListByTagLoaded) {
            return null;
        }

        this.totalItemsCount = this.props.newsListByTag.length;


        return (
            <section className='news_list_by_tag'>
                <div className='news_list_by_tag-content'>
                    <h3>Последние новости по запросу "{this.props.tag}"</h3>

                    <ul>
                        <NewsList
                            newsList={this.props.newsListByTag}
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

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

}

