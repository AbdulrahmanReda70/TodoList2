import { auth } from './auth';
import todoImage from '../images/todo2.jpg';
import cardImage from '../images/card.jpg';
import mindMapImage from '../images/mindMap.jpg';
import calenderImage from '../images/calender.jpg';
import { Link } from 'react-router-dom';
export function loader({ request }) {
    auth(request);
    return null;
}
const Products = () => {

    return (
        <div className='products'>
            <div className='container products-container'>

                <Link to={'todo/0'} className='todo product'>
                    <div className='todo-img product-img'>
                        <img src={todoImage} alt='' />
                    </div>
                    <div className='product-description'>
                        <h2>Todo list</h2>
                        <p>manage your time add tasks and lists. make you day organized <br /><br /></p>
                        <h3 style={{ color: '#3085d6' }}>Free plan</h3>
                    </div>
                </Link>
                <Link to={'cardTodo'} className='card-todo product'>
                    <div className='cardTodo-img product-img'>
                        <img src={cardImage} alt='' />
                    </div>
                    <div className='product-description'>
                        <h2>Cards time</h2>
                        <p>Have many tasks in your day or you always forget your tasks?
                            <br />
                            this is the time to use cards
                        </p>
                        <h3 style={{ color: '#3085d6' }}>Pro plan</h3>
                    </div>
                </Link>
                <Link to={'mindMap'} className='mind-map product'>
                    <div className='mind-map product-img'>
                        <img src={mindMapImage} alt='' />
                    </div>
                    <div className='product-description'>
                        <h2>Mind map</h2>
                        <p>⚡Soon...<br /><br /><br />
                        </p>
                        <h3 style={{ color: '#3085d6' }}>Premium plan</h3>
                    </div>
                </Link>
                <Link to={'calender'} className='calender product'>
                    <div className='calender product-img'>
                        <img src={calenderImage} alt='' />
                    </div>
                    <div className='product-description'>
                        <h2>Calender</h2>
                        <p>⚡Soon...<br /><br /><br />
                        </p>
                        <h3 style={{ color: '#3085d6' }}>Premium plan</h3>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Products;

