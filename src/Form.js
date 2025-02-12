import React from 'react';
import { useNavigate} from 'react-router-dom';

export default function PizzaForm(props){
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props;

      
    const navigate = useNavigate()
    const routeToConfirmation = () => {
        navigate('confirmation')
    }
    const onSubmit = evt => {
        evt.preventDefault();
        submit();
        routeToConfirmation();
       // console.log(orders);
    }

    const onChange = evt => {
        const {name,value,checked,type} = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name,valueToUse);
    }

    return(
        <form 
            id="pizza-form"
            onSubmit={onSubmit}
        >
            <h2>Let us know what you'd like...</h2>

            <div className="errors">
                <div>{errors.name}</div>
                <div>{errors.pizzaSize}</div>
            </div>

            <label>Name: 
                <input 
                    value={values.name}
                    onChange={onChange}
                    name="name"
                    type="text"
                    id="name-input" 
                />
            </label>

            <label>Pizza Size:
                <select 
                    name="pizzaSize" 
                    id="size-dropdown"
                    value={values.pizzaSize}
                    onChange={onChange}
                >
                    <option value="">Select a size option</option>
                    <option value='Personal (6inch)'>Personal (6")</option>
                    <option value='Medium (8inch)'>Medium (8")</option>
                    <option value='Large (12inch)'>Large (12")</option>
                    <option value='Extra Large (16inch)'>Extra Large (16")</option>
                </select>
            </label>

            <label>Pepperoni
                <input 
                    type="checkbox"
                    name="pepperoni"
                    checked={values.pepperoni}
                    onChange={onChange}
                />
            </label>

            <label>Sausage
                <input 
                    type="checkbox"
                    name="sausage"
                    checked={values.sausage}
                    onChange={onChange}
                />
            </label>

            <label>Onions
                <input 
                    type="checkbox"
                    name="onions"
                    checked={values.onions}
                    onChange={onChange}
                />
            </label>

            <label>Bell Peppers
                <input 
                    type="checkbox"
                    name="bellPeppers"
                    checked={values.bellPeppers}
                    onChange={onChange}
                />
            </label>

            <label>Special Instructions
                <input 
                    type="text"
                    name="specialInstructions"
                    value={values.specialInstructions}
                    onChange={onChange}
                    id="special-text"
                />
            </label>

            <button 
                id="order-button"
                disabled={disabled}
            >
            ADD TO ORDER
            </button>
        </form>
    )
}