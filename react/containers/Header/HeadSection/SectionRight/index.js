import React, {Component} from 'react';


import './sectionRight.scss';
import Social from './Social';
import Currency from './Currency';
import Login from './Login';

export default class SectionRight extends Component {
    render() {
        return (
            <div className='header-section_right'>
                <Social/>
                {this.props.currencyLoaded ? <Currency {...this.props}/> : null}
                <Login {...this.props}/>
            </div>
        )
    }
}