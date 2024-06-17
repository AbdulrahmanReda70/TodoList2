import { useContext } from 'react';
import { supabase } from '../supabase/supabase';
import { FcOk } from "react-icons/fc";
import { useNavigate } from 'react-router';
import { UserInfo } from '../context/UserContext';



const Pricing = () => {
    const userInfo = useContext(UserInfo);
    const user_role = userInfo?.user_metadata.role;
    const nav = useNavigate();
    async function addRule(role) {
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    role: role
                }
            });
            if (error) {
                throw error;
            } else {
                if (role === 2) {
                    alert(`🥳 Congratulation you now Pro subscriber`);


                } else {
                    alert(`🥳 Congratulation you now premium subscriber`);

                }

                nav(0);

            }
        } catch (error) {
            console.log(error);
            alert('Sorry you should login first 🦊');
        }
    }
    function isValidRole(role) {
        if (role <= user_role) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <div className="container">
            <h1 className="pricing-title">Choose Your Plan</h1>
            <div className="pricing-plans">
                <div className="plan">
                    <h2>free Plan</h2>
                    <p>Free</p>
                    <p>Perfect for individuals who need to organize their daily tasks.</p>
                    <ul>
                        <li>Access to all basic features</li>
                        <li>1 Project</li>
                        <li>Email support</li>
                    </ul>
                    <br />

                    <button disabled className={'notActiveBtn'} style={{ marginTop: '28px' }} ><FcOk style={{ fontSize: '25px', marginRight: "5px" }} /> Subscribed</button>
                </div>
                <div className="plan">
                    <h2>Pro Plan</h2>
                    <p>$20/month</p>
                    <p>Ideal for professionals who require more advanced features.</p>
                    <ul>
                        <li>All features in Basic Plan</li>
                        <li>2 Projects</li>
                        <li>Priority email support</li>
                        <li>Customizable themes</li>
                    </ul>
                    <button disabled={isValidRole(2)} className={isValidRole(2) ? 'notActiveBtn' : 'activeBtn'} onClick={() => addRule(2)}>{user_role >= 2 ? <><FcOk style={{ fontSize: '25px', marginRight: "5px" }} />Subscribed </> : 'Start now'}</button>
                </div>
                <div className="plan">
                    <h2>Premium Plan</h2>
                    <p>$30/month</p>
                    <p>Best for teams and businesses looking for comprehensive solutions.</p>
                    <ul>
                        <li>All features in Pro Plan</li>
                        <li>Unlimited Projects</li>
                        <li>24/7 customer support</li>
                        <li>Dedicated account manager</li>
                    </ul>
                    <button disabled={isValidRole(3)} className={isValidRole(3) ? 'notActiveBtn' : 'activeBtn'} onClick={() => addRule(3)}>{user_role === 3 ? <><FcOk style={{ fontSize: '25px', marginRight: "5px" }} />Subscribed </> : 'Start now'}</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
