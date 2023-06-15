import React, { useContext, useEffect } from 'react'
import { useTasks } from '../context/TaskContext'


export const TasksPage = () => {

  const { getTasks, tasks } = useTasks();


  useEffect(() => {
    getTasks()
    console.log(tasks)
  }, [])

  if(tasks.length === 0) return (<h1>No tasks</h1>)

  return (
    <div>
      {
        tasks.map(task => (
          <div key={task._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </div>
        ))
      }
    </div>
  )
}
