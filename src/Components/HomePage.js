import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../images/fox-7405603_1280.png';
import { useMediaQuery } from '../hooks/useMediaQuery';
const HomePage = () => {
    const is_min_width_991 = useMediaQuery(`(min-width:991px)`);
    return (
        <main className='home-main'>
            <section className='container '>
                <div className='home-flex'>
                    <h2 className='home-mainText'>
                        <span>Unlock your productivity </span>
                        potential with our curated suite of
                        <span> powerful tools</span>
                        <br /> <br />
                        Transform time into your
                        <span> greatest ally!</span>
                        <br /> <br />
                        ensuring every moment counts <span>towards </span> achieving your goals
                    </h2>
                    {
                        is_min_width_991 &&
                        <div className='home-img'>
                            <img src={homeImage} alt='' style={{ width: '350px' }} />
                        </div>
                    }
                </div>

                <div className='home-links'>
                    <Link to={'products'}>Get started</Link>
                    <Link to={'docs'}>Read the docs</Link>
                </div>
            </section>
        </main>
    );
};

export default HomePage;