import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch, useLocation } from 'react-router-dom';

import Main from './Router';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import '../css/App.css';


const Index = () => {
    return (
        <BrowserRouter>
            <Navbar currentLocation={useLocation} />
            <Route component={Main} />
            <Footer />
        </BrowserRouter>
    );
}
ReactDOM.render(<Index />, document.getElementById('index'));
