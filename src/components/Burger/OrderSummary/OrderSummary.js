import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                            .map(igKey => props.ingredients[igKey] ? 
                                        <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li> :
                                        null);

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <strong><p>Total Price : {props.price.toFixed(2)}</p></strong>
            <p>Continue to Checkout? </p>
            <Button btnType='Success' clicked={props.cancelled}>CANCEL</Button>
            <Button btnType='Danger' clicked={props.ordered}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;