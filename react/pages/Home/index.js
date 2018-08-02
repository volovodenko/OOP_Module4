import React, {Component, Fragment} from 'react';


import './home.scss';
import Slider from './Slider';
import Content from './Content';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.props.onGetSlider();
        this.props.onGetHomeNews();
    }

    render() {
        window.scrollTo(0, 0); //обнулить прокрутку

        return (
            <Fragment>
                {this.props.sliderLoaded ? <Slider {...this.props}/> : null}
                {this.props.homeNewsLoaded ? <Content {...this.props}/> : null}
            </Fragment>
        );
    }
}