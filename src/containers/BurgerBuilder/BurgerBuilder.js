import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            meat: 0,
            cheese: 0, 
            bacon: 0,
            salad: 0
        },
        totalPrice: 4,
        purchasable: false
    };

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

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;