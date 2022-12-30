import React from 'react';
import { Helmet } from 'react-helmet';

const PageError = () => {
    return (
        <>
     <Helmet> <title> Page not found </title></Helmet>
     <img src="https://i.ibb.co/XzVnRDV/404.webp" alt="page not found" className='w-screen h-screen'/>
        </>
    );
};

export default PageError;