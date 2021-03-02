import React, { Component } from 'react';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            city: '',
            zipCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Brujesh Agrawal',
                email: 'test@test.com',
                address: {
                    city: 'Bhubaneswar',
                    zipCode: '456789',
                    country: 'India'
                },
                deliveryMethod: 'fastest'
            }
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
            })
            .catch(error => {
                console.log('error : ' + error);
                this.setState({loading: false});
            });
    }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type='text' name="email" placeholder="Your email" />
                <input className={classes.Input} type='text' name="city" placeholder="Your City" />
                <input className={classes.Input} type="text" name="zipcode" placeholder="Yor Zipcode" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please provide your contact data.</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;