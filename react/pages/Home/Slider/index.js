import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import ImageGallery from 'react-image-gallery';


// carousel styles
import 'react-image-gallery/styles/css/image-gallery.css';
import './slider.scss'; //переписує стандартні стилі слайдера

import {URL_IMG_ARTICLES, INTERVAL_LAST_NEWS} from '../../../config';

export default class Slider extends Component {

    render() {

        if (!this.images) {
            this.imageTemplate();
        }

        return (
            <ImageGallery
                items={this.images}
                ref={i => this._imageGallery = i}
                showFullscreenButton={false}
                showPlayButton={false}

                autoPlay={true}
                slideInterval={INTERVAL_LAST_NEWS}
                onMouseOver={::this.onPause}
                onMouseLeave={::this.onPlay}
            />
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

    imageTemplate() {

        this.images = this.props.sliderList.map((item) => ({
            original: `${URL_IMG_ARTICLES}/${item.titleImg}`,
            thumbnail: `${URL_IMG_ARTICLES}/${item.titleImg}`,
            description: item.title,
            url: `category/${item.link}/${item.slug}`, //кастомное свойство (передаю url для ссылки)
            thumbnailClass: 'custom-thumb', //кастомный класс для thumbs
            renderItem: ::this.renderItem, //кастомный рендер каждого элемента

        }));

    }

    onPause() {
        this._imageGallery.pause();
    }

    onPlay() {
        this._imageGallery.play();
    }

    //Переписан родной метод renderItem библиотеки ImageGallery (добавлен Link для item.description)
    renderItem = (item) => {
        const onImageError = this.props.onImageError || this._handleImageError;

        return (
            <div className='image-gallery-image'>
                {
                    item.imageSet ?
                        <picture
                            onLoad={this.props.onImageLoad}
                            onError={onImageError}
                        >
                            {
                                item.imageSet.map((source, index) => (
                                    <source
                                        key={index}
                                        media={source.media}
                                        srcSet={source.srcSet}
                                    />
                                ))
                            }
                            <img
                                alt={item.originalAlt}
                                src={item.original}
                            />
                        </picture>
                        :
                        <img
                            src={item.original}
                            alt={item.originalAlt}
                            srcSet={item.srcSet}
                            sizes={item.sizes}
                            title={item.originalTitle}
                            onLoad={this.props.onImageLoad}
                            onError={onImageError}
                        />
                }

                {
                    item.description &&
                    <span className='image-gallery-description'>
                        <Link to={`/${item.url}`}>{item.description}</Link>
                    </span>
                }
            </div>
        );
    };
}