import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as yup from 'yup';
import Home from "./Home";
import PizzaForm from "./Form";
import Confirmation from "./Confirmation";
import schema from './FormSchema';

const initialFormValues = {
  name: '',
  pizzaSize: '',
  pepperoni: false,
  sausage: false,
  onions: false,
  bellPeppers: false,
  specialInstructions: ''
}

const initialFormErrors = {
  name: '',
  pizzaSize: '',
}

const initialOrders = [];
const initialDisabled = true;

const App = () => {

  const [orders, setOrders] = useState(initialOrders);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [newOrder,setNewOrder] = useState('');

  const getOrders = () => {
    axios.get(`https://reqres.in/api/orders`)
      .then(res=>{
        setOrders(res.data.data);
      })
      .catch(err=>console.error(err));
  }

  const postNewOrder = newOrder => {
    axios.post(`https://reqres.in/api/orders`, newOrder)
      .then(res=>{
        setOrders([res.data.data,...orders]);
        console.log(orders);
      })
      .catch(err=>console.error(err))
      .finally(()=>setFormValues(initialFormValues))
  }

  const validate = (name,value) => {
    yup.reach(schema,name)
      .validate(value)
      .then(()=>setFormErrors({...formErrors, [name]:''}))
      .catch(err=>setFormErrors({...formErrors,[name]:err.errors[0]}))
  }

  const inputChange = (name,value) => {
    validate(name,value);
    setFormValues({
      ...formValues,
      [name]:value
    });
  }


  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      pizzaSize: formValues.pizzaSize.trim(),
      toppings: ['pepperoni','sausage','onions','bellPeppers'].filter(topping=>!!formValues[topping]),
      specialInstructions: formValues.specialInstructions.trim()
    }
    postNewOrder(newOrder);
  }

  useEffect(()=>{
    getOrders();
  },[]);

  useEffect(()=>{
    schema.isValid(formValues).then(valid=>setDisabled(!valid))
  },[formValues]);


  return (
    <>
      <nav id="nav-main">
        <h3 id="nav-text">Lambda Eats</h3>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/">Help</Link>    
        </div>
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={<Home />}
          /> // Home route
        <Route 
          path="pizza" 
          element=
            {<PizzaForm 
              values={formValues}
              change={inputChange}
              submit={formSubmit}
              disabled={disabled}
              errors={formErrors}
            />}
            /> // Order Pizza route
        <Route 
          path="pizza/confirmation" 
          element=
            {<Confirmation 
              orders={orders}
            />}
          />
      </Routes>
    </>
  );
};
export default App;
