import React from 'react';

export default function Order(props){
    const {details} = props;
    return(
        <div>
            <h1>{details.name}</h1>
        </div>
    )
}