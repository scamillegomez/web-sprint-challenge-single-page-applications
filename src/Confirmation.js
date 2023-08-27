import React, {useEffect} from 'react';
import pizzaDog from './Assets/dogPizza.jpeg';

export default function Confirmation(props){
    const { newOrder  } = props;
    if(!newOrder){
        return <p>Loading...</p>
    }
    return(
        <div id="order-confirmation">
            <h2>THANKS FOR YOUR ORDER</h2>
            <h2>{newOrder.name}!</h2>
            <h3>Pizza Size:</h3>
            <p>{newOrder.pizzaSize}</p>
            <h3>Toppings:</h3>
            <p>{newOrder.toppings}</p>
            <h3>Special Instructions:</h3>
            <p>{newOrder.specialInstructions}</p>
            <h3>Sit tight and code on while we prepare your pizza!</h3>
            <div class="image-div">
                <img src={pizzaDog} alt="Pizza Gif" id="pizza-dog"/>
            </div>
        </div>
    )
}