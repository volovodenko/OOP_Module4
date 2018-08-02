import React, {Component} from 'react';

import './banner.scss';
import {URL_BANNERS} from '../../../../../config';

export default class Banner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bannerVisible: false,
            bannerNumber: 0
        }
    }

    render() {
        return (
            <section className={`${this.props.className}_banner`}>
                <div
                    className='banner-content'
                    card={this.props.data.id} //custom attribute
                    onMouseEnter={::this.toggleTooltip}
                    onMouseLeave={::this.toggleTooltip}
                >
                    <img
                        src={`${URL_BANNERS}/${this.props.data.id}/${this.props.data.img}`}
                        alt={this.props.data.img}
                    />
                    <h6>
                        {this.props.data.name}
                        <span>{this.props.data.model}</span>
                    </h6>
                    <span className='price'>{this.props.data.price} грн</span>
                    <a href={this.props.data.link} target='_blank'>{this.props.data.seller}</a>
                </div>
                {
                    this.state.bannerNumber === this.props.data.id && this.props.data.coupon
                        ? this.tooltipRender()
                        : ''
                }
            </section>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

    toggleTooltip(e) {
        const cardNumber = e.currentTarget.getAttribute('card') //мышка на карточке
            ? +e.currentTarget.getAttribute('card')
            : e.currentTarget.parentElement.getAttribute('card') //мышка на картинке, надписях
                ? +e.currentTarget.parentElement.getAttribute('card')
                : +e.currentTarget.parentElement.parentElement.getAttribute('card'); //мышка на цене

        this.setState({
            bannerVisible: !this.state.bannerVisible,
            bannerNumber: !this.state.bannerVisible ? cardNumber : 0
        });
    }

    tooltipRender() {
        return (<div className='banner-tooltip'>
            <p>
                Купон на скидку
                <br/>&#171;{this.props.data.coupon}&#187;<br/>
                Примените и получите скидку {this.props.data.discount}
            </p>
        </div>);
    }
}