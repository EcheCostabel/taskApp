import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const LoginPage = () => {


  const {register, handleSubmit, formState: {errors}} = useForm();
  const { signIn, errors: signInErrors } = useAuth()

  const onSubmit = handleSubmit((data) => {
    signIn(data)
  })

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

        <h1 className='text-2xl font-bold'>Login</h1>

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

            <button type='submit'>
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
