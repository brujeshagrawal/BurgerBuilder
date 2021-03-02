import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErroHandler/withErrorHandler';

import axios from '../../axios-orders';

class Orders extends Component{

    state = {
        orders: null
    };
    
    componentDidMount(){
        axios.get('/orders.json')
                .then(response => {
                    this.setState({orders: response.data});
                })
                .catch(error => console.log(error));
    }

    render(){
        let orders = <Spinner />;
        if(this.state.orders){
            orders = Object.keys(this.state.orders)
                                .map(ordKey => {
                                    return {
                                        ...this.state.orders[ordKey], 
                                        id: ordKey
                                    };
                                })
                                .map(order => <Order 
                                                key={order.id} 
                                                ingredients={order.ingredients} 
                                                price={+order.price} />);
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);