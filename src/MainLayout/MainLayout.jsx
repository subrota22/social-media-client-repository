import React from 'react';
import Navbar from '../components/Share/Navbar/Navbar';
import {Outlet} from "react-router-dom" ;
import Footer from '../components/Share/Footer/Footer';
const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default MainLayout;