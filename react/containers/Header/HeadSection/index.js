import React, {Component} from 'react';
import SectionLeft from './SectionLeft';
import SectionRight from './SectionRight';
import Logo from './Logo';

import './headSection.scss';


export default class HeadSection extends Component {

    render() {
        return (
            <section className='header-section-wrapper'>
                <div className='header-section'>
                    <SectionLeft {...this.props}/>
                    <Logo/>
                    <SectionRight {...this.props}/>
                </div>
            </section>
        );
    }
}