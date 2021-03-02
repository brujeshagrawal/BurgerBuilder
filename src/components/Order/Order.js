import React, { Component } from 'react';

import classes from './Order.css';

class Order extends Component{
    render(){
        const style= {
            border: '1px solid #ccc',
            margin: '0px 10px',
            padding: '5px',
            textTransform: 'capitalize',
            fontSize: '12px',
        }
        const order = Object.keys(this.props.ingredients)
            .map(igKey => <span 
                            key={igKey}
                            style={style}>
                                {igKey}({this.props.ingredients[igKey]})
                        </span>);

        return (
            <div className={classes.Order}>
                <p>Ingredients : {order}</p>
                {/* <ul>
                    {order}
                </ul> */}
                <p>Price : <strong>${this.props.price.toFixed(2)}</strong></p>
            </div>
        );
    }
}

export default Order;