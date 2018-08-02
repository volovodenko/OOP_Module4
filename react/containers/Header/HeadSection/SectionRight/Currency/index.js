import React from 'react';

import './currency.scss';

const Currency = ({currencyList}) => {

    const diffRate = (currentRate, lastRate) => currentRate * 1000000 - lastRate * 1000000;

    const getArrow = (currency, currentRate) => {

        const lastRate = currency === 'USD'
            ? currencyList[2].rate
            : currencyList[3].rate;

        const currencyDif = diffRate(currentRate, lastRate);

        return currencyDif > 0 ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
    };

    const currentUsdRate = currencyList[0].rate; //current currentUsdRate rate
    const currentEurRate = currencyList[1].rate; //current currentEurRate rate
    const USDarrow = getArrow('USD', currentUsdRate); //arrow for currentUsdRate
    const EURarrow = getArrow('EUR', currentEurRate); //arrow for currentEurRate


    return (
        <div className='currency'>
                <span className='dollar'>
                    <span className='fa-stack'>
                         <i className='fa fa-circle fa-stack-1x'/>
                         <i className='fa fa-usd fa-stack-1x fa-inverse'/>
                    </span>
                    <span className='rate'>{currentUsdRate.toFixed(2)}</span>
                    <i className={USDarrow}/>
                </span>
            <span className='euro'>
                    <span className='fa-stack'>
                         <i className='fa fa-circle fa-stack-1x'/>
                         <i className='fa fa-eur fa-stack-1x fa-inverse'/>
                    </span>
                    <span className='rate'>{currentEurRate.toFixed(2)}</span>
                    <i className={EURarrow}/>
                </span>
        </div>
    )
};

export default Currency;