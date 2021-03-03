import React, { Component } from 'react';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{

    // state = {
    //     name: '',
    //     email: '',
    //     address: {
    //         city: '',
    //         zipCode: ''
    //     },
    //     loading: false
    // };

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: this.state.orderForm.name.value,
                email: this.state.orderForm.email.value,
                address: {
                    city: this.state.orderForm.city.value,
                    zipCode: this.state.orderForm.zipCode.value,
                    country: this.state.orderForm.country.value
                },
                deliveryMethod: this.state.orderForm.deliveryMethod.value
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

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = isValid && value.trim() !== '';
        }

        if(rules.minLength){
            isValid = isValid && value.length >= rules.minLength;
        }

        if(rules.maxLength){
            isValid = isValid && value.length <= rules.maxLength;
        }
        
        return isValid;
    }

    inputChangedHandler = (event, formKey) => {
        const orderForm = {...this.state.orderForm};
        const formElement = {...orderForm[formKey]};
        formElement['value'] = event.target.value;
        formElement['valid'] = this.checkValidity(formElement['value'], formElement['validation']);
        formElement['touched'] = true;
        orderForm[formKey] = formElement;

        let formIsValid = true;
        for(let inputIdentifier in orderForm){
            formIsValid = formIsValid && orderForm[inputIdentifier].valid;
        }
        this.setState({orderForm: orderForm, formIsValid: formIsValid});
    }

    render(){
        let form = (
            <form onSubmit={this.orderHandler}>
                {Object.keys(this.state.orderForm)
                        .map(formKey => <Input 
                                            {...this.state.orderForm[formKey]}
                                            key={formKey}
                                            changed={(event) => this.inputChangedHandler(event, formKey)}  />)}
                {/* <Input inputtype='input' type="text" name="name" placeholder="Your Name" />
                <Input inputtype='input' type='text' name="email" placeholder="Your email" />
                <Input inputtype='input' type='text' name="city" placeholder="Your City" />
                <Input inputtype='input' type="text" name="zipcode" placeholder="Yor Zipcode" /> */}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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