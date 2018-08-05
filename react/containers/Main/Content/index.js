import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import './content.scss';
import NotFound from './NotFound';
import Home from '../../../pages/Home';
import NewsByTag from '../../../pages/NewsByTag';

import CategoryList from '../../../pages/CategoryList';
import Article from '../../../pages/Article';

export default class Content extends Component {

    render() {
        return (
            <main className='main-content'>
                <Switch>
                    <Route exact path='/' render={() => <Home location={location} {...this.props}/>}/>
                    <Route exact path='/category/:category'
                           render={(location) => <CategoryList location={location} {...this.props}/>}
                    />
                    <Route exact path='/category/:category/:slug'
                           render={(location) => <Article location={location} {...this.props}/>}
                    />
                    <Route exact path='/tags/:tag' render={location => this.tags(location)}/>
                    <Route component={NotFound}/>
                </Switch>
            </main>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/


    tags(location) {
        const tag = location.match.params.tag.split('.')[0];
        const html = location.match.params.tag.split('.')[1];

        if (!html) {
            return <Redirect to={`/tags/${tag}.html`}/>
        }

        if (html !== 'html') {
            return <NotFound/>
        }

        return <NewsByTag {...this.props} tag={tag}/>
    }

}