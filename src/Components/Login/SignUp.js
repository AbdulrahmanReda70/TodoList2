import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../supabase/supabase';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const SignUp = () => {

    const schema = z.object(
        {
            email: z.string().email(),
            password: z.string().min(5),
            confirmPassword: z.string().refine((confirm) => {
                if (confirm === watch('password')) {
                    return true;
                } else {
                    return false;
                }
            }, {
                message: 'Passwords do not match',
                path: ['confirmPassword'],
            }),
        }
    );
    const [searchParams] = useSearchParams();
    const go_location = searchParams.get('location');
    const nav = useNavigate();
    async function onSubmit(e) {
        try {
            const { error } = await supabase.auth.signUp({
                email: e.email,
                password: e.password,
                options: {
                    emailRedirectTo: `https://main--todoofor-all.netlify.app/${go_location}`
                }
            });

            if (error) {
                throw error.message;
            } else {
                nav('/confirm');
            }
        } catch (error) {
            setError('root', { message: error });
        }

    }
    const {
        register,
        watch,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(schema) });
    console.log(errors);
    return (
        <div className='login-container container' >
            <form className='login' method='post' onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px' }} >
                <h2 className='logo'>Sign Up</h2>
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
                <div className='login-field'>
                    <label>Confirm Password</label>
                    <input type='password' {...register('confirmPassword')} />
                    {errors.confirmPassword && (<p className='message'>{errors.confirmPassword.confirmPassword.message}</p>)}
                </div>

                {errors.root && (<p className='message'>{errors.root.message}</p>)}
                <button type='submit' disabled={isSubmitting} className={isSubmitting ? 'submitting signUp-button' : 'signUp-button'}>{isSubmitting ? 'Submitting...' : 'Sign Up'}</button>
            </form>
        </div>
    );
};

export default SignUp;