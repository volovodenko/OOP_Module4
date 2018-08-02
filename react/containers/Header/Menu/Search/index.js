import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './search.scss';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clearIconVisible: false,
            searchOpen: false
        };

        this.inputTag = React.createRef();
        this.searchForm = React.createRef();

        this.handleClickOutside = ::this.handleClickOutside;
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

    render() {
        return (
            <div
                ref={this.searchForm}
                className={'header-menu__search' + (this.state.searchOpen ? ' active' : '')}
                onClick={::this.openSearch}
            >
                {
                    !this.state.searchOpen ? <p>Поиск</p> : null
                }

                <input type='text'
                       ref={this.inputTag}
                       placeholder='введите текст'
                       onKeyDown={::this.onKeyDown}
                       onChange={::this.onChangeInput}
                />
                <span className='fa fa-search fa-lg'/>

                {this.closeIconRender()}
                {/*{*/}
                    {/*this.state.searchOpen ?*/}
                        {/*<ul className='tagsList'>*/}
                            {/*<li>hello</li>*/}
                        {/*</ul>*/}
                        {/*: null*/}
                {/*}*/}

                {
                    this.state.searchOpen && this.props.tagsListLoaded && this.inputTag.current.value.length
                        ?
                        <ul className='tagsList'>
                            {this.tagsList()}
                        </ul>
                        : null
                }
            </div>
        )
    }

    /***************************************************************************
     *
     **************************************************************************/

    handleClickOutside(e) {
        if (!e.composedPath().includes(this.searchForm.current) && this.state.searchOpen) {
            this.closeSearch();
        }
    }

    tagsList() {
        if (!this.props.tagsList.length) {
            return <li>Нет совпадений</li>;
        }
        return this.props.tagsList.map(item => (
            <li key={item.id}>
                <Link onClick={::this.closeSearch} to={`/tags/${item.tag}.html`}>{item.tag}</Link>
            </li>
        ));
    }

    openSearch() {
        this.onChangeInput(); //если был введен текст в инпут - возобновить крестик

        if (!this.state.searchOpen) {
            this.setState({
                searchOpen: true
            });

            this.inputTag.current.focus(); //сфокусироваться на инпуте
        }

    }

    closeSearch() {
        this.setState({
            clearIconVisible: false,
            searchOpen: false
        });
        this.props.onClearTagsForSearch();
        this.inputTag.current.value = '';
    }

    //Нажато Enter - закрыть
    onKeyDown(e) {
        if (e.key === 'Enter') {
            this.closeSearch();
        }
    }

    onChangeInput() {
        let val = this.inputTag.current.value.trim();

        //Введен хоть один символ в инпуте - отобразить крестик
        //удалены символы - спрятать крестик
        if (!this.state.clearIconVisible && val.length) {

            this.setState({clearIconVisible: true});

        } else if (this.state.clearIconVisible && !val.length) {

            this.setState({clearIconVisible: false});
            this.props.onClearTagsForSearch();

        }


        if (val.length) {
            this.props.onGetTagsForSearch(val);
        }

    }

    clearInput() {
        this.inputTag.current.value = '';
        this.inputTag.current.focus();
    }

    closeIconRender() {
        return this.state.clearIconVisible
            ? <i className='fa fa-times' onClick={::this.clearInput}/>
            : null
    }

}