import React, {useEffect} from 'react';

export default function Confirmation(props){
    const { newOrder  } = props;
    if(!newOrder){
        return <p>Loading...</p>
    }
    return(
        <div>
            <h2>THANKS FOR YOUR ORDER {newOrder.name}!</h2>
            <h3>Here are your order details:</h3>
            <h3>Pizza Size:</h3>
            <p>{newOrder.pizzaSize}</p>
            <h3>Toppings:</h3>
            <p>{newOrder.toppings}</p>
            <h3>Special Instructions:</h3>
            <p>{newOrder.specialInstructions}</p>
            <h3>Sit tight and code on while we prepare your pizza!</h3>
        </div>
    )
}