import React, {Component} from 'react';

import './paginate.scss';

export default class Paginate extends Component {

    constructor(props) {
        super(props);

        this.countPages = Math.ceil(this.props.totalItemsCount / this.props.itemsCountPerPage);
        this.arrayPages = [];
        for (let i = 1; i <= this.countPages; i++) {
            this.arrayPages.push(i);
        }

        this.state = {
            pageVisible: false
        };
    }

    render() {
        return (
            <ul className='paginate'>

                {/*<li className={'paginate-prevPage ' + (this.props.activePage === 1 ? 'disActive' : '')}*/}
                {/*onClick={::this.prevPage}*/}
                {/*>*/}
                {/*<i className='fa fa-angle-left fa-lg' aria-hidden='true'/>*/}
                {/*</li>*/}

                {this.pageTemplate()}

                {/*<li className={'paginate-nextPage ' + (this.props.activePage === this.countPages ? 'disActive' : '')}*/}
                {/*onClick={::this.nextPage}*/}
                {/*>*/}
                {/*<i className='fa fa-angle-right fa-lg' aria-hidden='true'/>*/}
                {/*</li>*/}

            </ul>
        );
    }

    /***************************************************************************
     *
     **************************************************************************/

    pageTemplate() {
        return this.arrayPages.map((item, index, self) => {
            if (index === 1 && self.length > 2 && !this.state.pageVisible) {
                return (
                    <li className={'paginate-page '}
                        key={index + 1}
                        onClick={::this.setPageVisible}
                    >
                        ...
                    </li>
                )
            }

            if (index > 0 && index < self.length - 1 && self.length > 2 && !this.state.pageVisible) {
                return null;
            }

            return (
                <li className={'paginate-page ' + (this.props.activePage === (index + 1) ? 'active' : '')}
                    key={index + 1}
                    onClick={::this.setPage}
                >
                    {index + 1}
                </li>
            )
        });
    }

    setPageVisible() {
        this.setState({pageVisible: !this.state.pageVisible});
    }

    setPage(e) {
        this.props.onChange(+e.currentTarget.innerHTML);
    }

    // prevPage() {
    //     if (this.props.activePage === 1) {
    //         return;
    //     }
    //
    //     this.props.onChange(this.props.activePage - 1);
    // }
    //
    // nextPage() {
    //     if (this.props.activePage === this.countPages) {
    //         return;
    //     }
    //
    //     this.props.onChange(this.props.activePage + 1);
    // }


}