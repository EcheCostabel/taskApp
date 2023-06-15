import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {


  const {register, handleSubmit, formState: {errors}} = useForm();
  const { signIn, errors: signInErrors, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    if(isAuthenticated) navigate('/tasks')  //con esto lo mando a /tasks cuando se logea
  }, [isAuthenticated])

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {
            signInErrors.map((error, i) => (
                <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                    {error}
                </div>
            ))
        }

        <h1 className='text-3xl font-bold my-2'>Login</h1>

        <form onSubmit={onSubmit}>

            <input type="email" {...register('email', {required: true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Email'
            />
            {
                errors.email && (
                    <p className='text-red-500'>Email is required</p>
                )
            }


            <input type="password" {...register('password', {required: true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Password'
            />
            {
                errors.password && (
                    <p className='text-red-500'>Password is required</p>
                )
            }

            <button type='submit' className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>
                Login
            </button>
        </form>

        <div className='flex gap-x-2 justify-between'>
            <p >
            Already have an account? {' '}
            </p>
            <Link to='/register' className='text-sky-500'>Register</Link>
        </div>
      </div>
    </div>
  )
}
