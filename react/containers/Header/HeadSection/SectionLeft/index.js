import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ReactDom from 'react-dom';

import './sectionLeft.scss';
import {INTERVAL_HOT_NEWS} from '../../../../config';

export default class SectionLeft extends Component {


    constructor(props) {
        super(props);

        this.slideIndex = 0;

        this.state = {
            slideIndex: this.slideIndex
        };

        this.startTimer();

    }

    render() {
        return (
            <div className='header-section_left' onMouseEnter={::this.stopTimer} onMouseLeave={::this.startTimer}>
                <h6>Горячая новость</h6>
                <div className='slider'>
                    <i className='fa fa-chevron-circle-left' onClick={::this.minusSlide}/>
                    <i className='fa fa-chevron-circle-right' onClick={::this.plusSlide}/>
                </div>
                <ul className='hot-article' ref='hotArticle'>
                    {this.props.hotNewsLoaded ? this.hotNewsRender() : ''}
                </ul>
            </div>
        );
    }

    /***************************************************************************
     *
     **************************************************************************/
    hotNewsRender() {
        return this.props.hotNewsList.map((item, index) => (
            <li key={item.id} className={this.state.slideIndex === index ? 'active' : ''}>
                <Link to={`/${item.link}/${item.slug}`}>
                    {item.title}
                </Link>
            </li>
        ));
    }

    stopTimer() {
        clearInterval(this.timerId);
    }

    startTimer() {
        this.timerId = setInterval(() => this.plusSlide(), INTERVAL_HOT_NEWS);
    }

    plusSlide() {
        ++this.slideIndex;
        this.showSlides();
    }

    minusSlide() {
        --this.slideIndex;
        this.showSlides();
    }


    showSlides() {
        let numberSlides = ReactDom.findDOMNode(this.refs.hotArticle).children.length-1;

        if (this.slideIndex > numberSlides) {
            this.slideIndex = 0;
        }
        if (this.slideIndex < 0) {
            this.slideIndex = numberSlides;
        }

        this.setState({
            slideIndex: this.slideIndex
        });
    }

}