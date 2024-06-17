
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabase/supabase';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import faceIcon from '../images/facebook.png';
import { useMediaQuery } from '../hooks/useMediaQuery';

const schema = z.object(
    {
        email: z.string().email(),
        password: z.string().min(5)
    }
);



const Login = () => {
    const is_min_width_991 = useMediaQuery(`(min-width:991px)`);
    const [searchParams] = useSearchParams();
    const paramMessage = searchParams.get('message');
    console.log(paramMessage, 'param');
    const go_location = searchParams.get('location');
    const locationState = useLocation().state;
    console.log(locationState, 'location');
    const nav = useNavigate();
    const {

        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(schema) });


    async function onSubmit(e) {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: e.email,
                password: e.password,
            });
            if (error) {
                throw error;
            } else {
                localStorage.setItem('firstLogin', true);
                if (go_location) {
                    localStorage.setItem('navTo', JSON.stringify({ active: true, location: go_location }));
                } else {
                    localStorage.setItem('navTo', JSON.stringify({ active: true, location: locationState }));
                }
                nav(go_location ? go_location : '/', { replace: true });
                setTimeout(() => {
                    window.location.reload();
                }, 0);
            }
        } catch (error) {
            setError('root', {
                message: error.message
            });
        }

    }



    async function googleSignIn() {
        nav('/', { replace: true });
        localStorage.setItem('firstLogin', true);
        if (go_location) {
            localStorage.setItem('navTo', JSON.stringify({ active: true, location: go_location }));
        } else {
            localStorage.setItem('navTo', JSON.stringify({ active: true, location: locationState }));
        } try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error signing in with Google:', error.message);
        }

    }

    async function facebookSignIn() {
        nav('/', { replace: true });
        localStorage.setItem('firstLogin', true);
        if (go_location) {
            localStorage.setItem('navTo', JSON.stringify({ active: true, location: go_location }));
        } else {
            localStorage.setItem('navTo', JSON.stringify({ active: true, location: locationState }));
        } try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'facebook',

            });
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error signing in with Facebook:', error.message);
        }
    };


    return (
        <div className='login-container container'>

            {
                is_min_width_991 &&
                <h1 className='login-text'>Todo</h1>
            }
            <form className='login' method='post' onSubmit={handleSubmit(onSubmit)} >
                <h2 className='logo'>Ready!</h2>
                {
                    paramMessage && <h3 style={{ color: 'brown', textAlign: 'center' }}>{paramMessage}</h3>
                }
                <div className='login-field'>
                    <label>Email</label>
                    <input type='email'
                        {...register('email')}
                    />
                    {errors.email && (<p className='message'>{errors.email.message}</p>)}
                </div>
                <div className='login-field'>
                    <label>Password</label>
                    <input type='password' {...register('password')} />
                    {errors.password && (<p className='message'>{errors.password.message}</p>)}
                </div>
                {errors.root && (<p className='message'>{errors.root.message}</p>)}
                <div className='account'>
                    <Link to={'/signUp'}>Create new account</Link>
                </div>
                <button type='submit' className={isSubmitting ? 'submitting' : null} disabled={isSubmitting}>Sign in</button>
                <div className='separative'>
                    <div className='line left'></div>
                    <div className='text'>or</div>
                    <div className='line right'></div>
                </div>
                <button type='button' onClick={googleSignIn} className="social-button">
                    <img className='social-img' src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" />
                    Sign in with Google
                </button>
                <button type='button' onClick={facebookSignIn} className='social-button'>
                    <img className='social-img' src={faceIcon} alt="Facebook icon" />
                    Sign in with Facebook
                </button>
            </form>
        </div>
    );

};

export default Login;;