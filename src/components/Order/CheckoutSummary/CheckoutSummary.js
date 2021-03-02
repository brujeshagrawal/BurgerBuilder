import React, { Component } from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

class CheckoutSummary extends Component{
    render(){
        return (
            <div className={classes.CheckoutSummary}>
                <h1>We hope it tastes well!!</h1>
                <div style={{width: '100%', margin: 'auto'}}>
                    <Burger ingredients={this.props.ingredients} />
                </div>
                <Button btnType="Danger" clicked={this.props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.checkoutContinued}>CONTINUE</Button>
            </div>
        );
    }
}

export default CheckoutSummary;