import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as yup from 'yup';
import Home from "./Home";
import PizzaForm from "./Form";
import Confirmation from "./Confirmation";
import { v4 as uuid } from 'uuid'
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
  const [isLoading, setIsLoading] = useState(false);
  const [newOrder, setNewOrder] = useState(null);

  
  //adding some debugging code
  const navigate = useNavigate();
  const postNewOrder = async newOrder => {
    
    console.log("Entering Post New Order POST request...");
    setIsLoading(true);
    try {
      const res = await axios.post('https://reqres.in/api/orders',newOrder);
      console.log('Received Post Data:',res.data); // debugging line
      setOrders([...orders, res.data]);
      setNewOrder(res.data);
      navigate("/pizza/confirmation");
    } catch(err){
      console.error('Axios POST error:',err); // debugging line
    } finally {
      setFormValues(initialFormValues);
      setIsLoading(false);
    }
  //   setIsLoading(true);
  //   try {
  //   const res = await axios.post(`https://reqres.in/api/orders`, newOrder);
  //     setOrders([res.data,...orders]);
  //     navigate("/pizza/confirmation");
  //     }
  //     catch(err) {
  //       console.error(err);
  //     } finally {
  //       setFormValues(initialFormValues);
  //       setIsLoading(false);
  // }
};

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


 const formSubmit = async () => {
    const newOrder = {
      name: formValues.name.trim(),
      pizzaSize: formValues.pizzaSize.trim(),
      toppings: ['pepperoni','sausage','onions','bellPeppers'].filter(topping=>!!formValues[topping]),
      specialInstructions: formValues.specialInstructions.trim()
    }
    await postNewOrder(newOrder);
    console.log(orders);
  }

  // Adding some debugging to try and figure out why .then() is returning undefined result
  // useEffect(()=>{
  //   console.log('Entering "Use Effect" for "GET" call...');

  //   (async () => {
  //     try {
  //       const res = await axios.get('https://reqres.in/api/orders');
  //       console.log('Received Data:',res.data); // debugging line
  //       setOrders(res.data.data);
  //     } catch(err){
  //       console.log("Axios error:", err);
  //     }
  //   })();
  // },[]);
  //   const promise = axios.get(`https://reqres.in/api/orders`);
  //   console.log('Is it a promise?', !!promise.then);
  //     .then(res=>{
  //       setOrders(res.data.data);
  //     })
  //     .catch(err=>console.error(err));
  //     console.log(orders);
  // },[]);

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
            { isLoading ?
            <div>Loading Order Details...</div> :
            <Confirmation 
              //getOrders={getOrders}
              newOrder={newOrder}
            />}
          />
      </Routes>
    </>
  );
};
export default App;
