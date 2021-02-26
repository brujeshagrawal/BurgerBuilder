import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.css';

const sideDrawer = (props) => {

    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={props.open ? [classes.SideDrawer, classes.Open].join(' ') : [classes.SideDrawer, classes.Close].join(' ')}>
                <div className={classes.Logo}><Logo /></div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;