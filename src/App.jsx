import { useState } from 'react'
import { Task } from './components/Task'
import { useRef } from 'react'
import styles from '../src/app.module.css'
const data = []

export function App() {
  const inputRef = useRef(null)
  const [tasks, setTasks] = useState(data)
  
  function handleAddTask() {
    if (inputRef.current.value){
      const newTask = {
        id: tasks.length + 1,
        title: inputRef.current.value,
        isCompleted: false
      }

      setTasks([...tasks, newTask])
      inputRef.current.value = ""
      } 
  }

function handleCompleteTask(id) {
  const taskIndex = tasks.findIndex(item => item.id == id);

  if(taskIndex == -1){
    return
  }

  const newTasks = [...tasks]

  newTasks[taskIndex].isCompleted = true
  setTasks(newTasks)
}

  return (
  <main className={styles.container}>
    <div className="logo_group">
      <img src="../public/list-solid.svg" alt="icone lista" className='logo_img' />
      <h1 className={styles.title}>To Do App</h1>
    </div>
    <div className={styles.inputGroup}>
      <input className={styles.input} ref={inputRef} placeholder='Ex: English Class' type="text" onKeyDown={(event) => event.key == "Enter" && handleAddTask()}/>
      <button className={styles.button} onClick={handleAddTask}>Add</button>
    </div>
      
    <div className={styles.tasks}>
      {tasks.length > 0 && tasks.map(item => (
      <Task key={item.id} task={item} handleCompleteTask={handleCompleteTask} />
      ))}


      {!tasks.length && <p>Nothing here, take a rest or add a new task! &#128513;</p>}

    </div>

  </main>
  )
}
