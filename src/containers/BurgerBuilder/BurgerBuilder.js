import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErroHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        axios.get('/ingredients.json')
                .then(response => this.setState({ingredients: response.data}))
                .catch(error => this.setState({error: true}));
    }

    updatePurchaseState(updatedIngredients){
        const ingredients = {...updatedIngredients};
        const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, el) => sum+el, 0);
        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        ingredients[type] += 1;
        const oldTotal = this.state.totalPrice;
        const newTotal = oldTotal + INGREDIENT_PRICES[type];
        this.setState({ingredients: ingredients, totalPrice: newTotal});
        this.updatePurchaseState(ingredients)
    }

    removeIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        if(ingredients[type]>0){
            ingredients[type] -= 1;
            const oldTotal = this.state.totalPrice;
            const newTotal = oldTotal - INGREDIENT_PRICES[type];
            this.setState({ingredients: ingredients, totalPrice: newTotal});
            this.updatePurchaseState(ingredients)
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = []
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;
        let orderSummary = null;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo} 
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                                        price={this.state.totalPrice}
                                        cancelled={this.purchaseCancelHandler}
                                        ordered={this.purchaseContinueHandler} />;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                { orderSummary }
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);