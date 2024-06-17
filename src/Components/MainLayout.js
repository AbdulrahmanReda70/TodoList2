import React, { useContext, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import { supabase } from '../supabase/supabase';
import { CSSTransition } from 'react-transition-group';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { UserInfo } from '../context/UserContext';
import avatarImage from '../images/avatar.jpg';

const MainLayout = () => {
    const userInfo = useContext(UserInfo);
    const user_role = userInfo?.user_metadata.role;
    const is_min_width_991 = useMediaQuery(`(min-width:991px)`);
    const nav = useNavigate();

    // toggle menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuToggle = useRef(null);
    const toggleLinks = useRef(null);
    // user Info
    const user = userInfo;
    // welcome pop-up
    const [show_welcome_pop, setShow_welcome_pop] = useState(false);
    const [show, setShow] = useState(false);

    // the avatar image for the user not working with context with supabase
    const [userImage, setUserImage] = useState(null);
    useEffect(() => {
        async function getUser() {
            const user = await supabase.auth.getUser();
            setUserImage(user.data.user?.user_metadata.avatar_url);
        }
        getUser();
    }, [userImage]);
    // navigate the user after login 
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && localStorage.getItem('firstLogin')) {
                console.log('User signed in:', session.user);
                const navLocation = JSON.parse(localStorage.getItem('navTo'));
                nav(navLocation?.location);
                setTimeout(() => {
                    localStorage.removeItem('navTo');
                }, 1000);
            } else if (event === 'SIGNED_OUT') {
                console.log('User signed out');
            }
        });
    }, [nav]);



    // pop-up
    useEffect(() => {
        console.log('fom pop');
        if (user && localStorage.getItem('firstLogin')) {
            localStorage.removeItem('firstLogin');
            console.log('target');
            setTimeout(() => {
                setShow_welcome_pop(true);
            }, 500);
            setTimeout(() => { // wait until the element mount and then apply the transition  
                setShow(true);
            }, 1000);
            setTimeout(() => { // unmount the pop from dom
                setShow_welcome_pop(false);
            }, 6000);
        }
        return () => {
        };
    }, [user]);

    useEffect(() => {
        console.log('fom menu');
        if (!is_min_width_991) {

            function changeMenuState(e) {
                if (isMenuOpen === false) {
                    if (e.target === menuToggle.current) {
                        setIsMenuOpen(p => !p);
                    }
                } if (isMenuOpen === true) {
                    if (!toggleLinks.current.contains(e.target)) {
                        setIsMenuOpen(p => !p);
                    }
                }
            }
            window.addEventListener('click', changeMenuState);
            return () => {
                window.removeEventListener('click', changeMenuState);
            };
        }
        if (is_min_width_991) {
            setIsMenuOpen(true);
        }

    }, [isMenuOpen, is_min_width_991]);

    function userPlanName() {
        if (user_role === 2) {
            return 'Pro Plan';
        } else if (user_role === 3) {
            return 'Premium';
        } else {
            return 'Free Plan';
        }
    }
    return (
        <div>
            {
                show_welcome_pop ?
                    <CSSTransition in={show} timeout={2500} classNames="slide">
                        <div className='popup'>
                            <p>Welcome!</p>
                            <div className='pop-userInfo'>
                                <img src={userImage} style={{ width: '26px', borderRadius: '50%' }} alt='' />
                                {user?.user_metadata?.name}
                            </div>
                        </div>
                    </CSSTransition> : null
            }

            <nav className='mainNav'>
                <div>
                    <div className='logo'>
                        <h1>Todo</h1>
                    </div>
                </div>

                {
                    !is_min_width_991 &&
                    < div className="menu-toggle" ref={menuToggle} >
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                }


                <div className={isMenuOpen ? 'toggle-links show' : 'toggle-links hide'} ref={toggleLinks} >
                    <ul>
                        <li><NavLink to={''} className={({ isActive }) => isActive ? 'active-navlink' : null}>Home</NavLink></li>
                        <li><NavLink to={'docs'} className={({ isActive }) => isActive ? 'active-navlink' : null}>Docs</NavLink></li>
                        <li><NavLink to={'products'} className={({ isActive }) => isActive ? 'active-navlink' : null}>Products</NavLink></li>
                        <li><NavLink to={'productsV2'} className={({ isActive }) => isActive ? 'active-navlink' : null}>ProductsV2</NavLink></li>
                        <li><NavLink to={'pricing'} className={({ isActive }) => isActive ? 'active-navlink' : null}>Pricing</NavLink></li>
                        <li >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {user ? (<img src={userImage ? userImage : avatarImage} style={{ width: '40px', borderRadius: '50%' }} alt='' />) : <NavLink to={'login'} className={({ isActive }) => isActive ? 'active-navlink' : null}>Login</NavLink>}
                                {user && <p style={{ padding: '5px', borderRadius: '8px', backgroundColor: 'blueviolet', fontSize: '14px' }}>{userPlanName()}</p>}
                            </div>
                        </li>
                        {user && <li><div style={{ color: 'brown', fontSize: '16px', cursor: 'pointer' }} onClick={() => { localStorage.clear(); nav(0); }}>Logout</div></li>}

                    </ul>
                </div>
            </nav>
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
