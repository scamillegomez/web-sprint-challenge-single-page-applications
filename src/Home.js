import { useNavigate, Routes, Route, Link } from 'react-router-dom';

export default function Home(props){
    const { orders } = props;
    const navigate = useNavigate();
    const routeToForm = () => {
        navigate('/pizza');
    }


return(
    <div className="home-wrapper">
        <h1>Your favorite food delivered, while coding</h1>
        <button id="order-pizza" onClick={routeToForm}>ORDER PIZZA</button>
    </div>
)
}