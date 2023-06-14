import React from 'react'
import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TaskContext.jsx';


export const TaskFormPage = () => {


  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();
  console.log(createTask)

  const onSubmut = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

      <form onSubmit={onSubmut}>
        <input 
          type="text" 
          placeholder='Title' 
          {...register('title')}
          autoFocus
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <textarea 
        rows="3" 
        placeholder='Description'
        {...register('description')}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        ></textarea>

        <button>
          Save
        </button>
      </form>

    </div>
  )
}
