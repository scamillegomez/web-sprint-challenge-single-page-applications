import React from 'react';
import Order from './Order';

export default function Confirmation(props){
    const {orders} = props;
    return(
        <div>
            Test
            {orders.map(order=>{
                <Order key={order.id} details={order}/>
            })}
        </div>
    )
}