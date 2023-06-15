import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TaskContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';


export const TaskFormPage = () => {


  const { register, handleSubmit, setValue } = useForm();
  const { createTask, editTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

 

  useEffect(() => {   //Esto es para cuando toco editar me abra este componente pero con los inputs cargados
    const loadTask = async() => {
      if(params.id) {
        const task = await editTask(params.id)  
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }
    loadTask()
  }, [])

  const onSubmit = handleSubmit((data) => {
    if(params.id){
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate('/tasks')
  })
  

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

      <form onSubmit={onSubmit}>
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
