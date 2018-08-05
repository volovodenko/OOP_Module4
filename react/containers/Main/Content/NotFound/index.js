import React from 'react';

import './notFound.scss';

const NotFound = () => {
    window.scrollTo(0, 0); //обнулить прокрутку

    return <p className='not-found'>Ошибка 404. Страница не найдена</p>;
};

export default NotFound;