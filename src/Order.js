import React from 'react';

export default function Order(props){
    const {order, key} = props;
    return(
        <div>
            <h1 id={key}>{order.name}</h1>
        </div>
    )
}