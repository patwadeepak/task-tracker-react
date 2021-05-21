import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {

  const [tasks, setTasks] = useState([])

  const [showAddTask, setShowAddTask] = useState(false)

  // Fetch tasks
  const fetchTasks = () => {
    const response = localStorage.getItem("tasks")
    const json = JSON.parse(response)
    if (json === null) localStorage.setItem('tasks', JSON.stringify(tasks))
    return json || tasks;
  }

  // Add task
  const addTask = (task) => {
    const newTasks = [...tasks, {id:tasks.length+1, ...task}]
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }

  // delete a task
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task)=>task.id!==id)
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    const newTasks = tasks.map((task) => task.id === id 
    ? {...task, reminder: !task.reminder} : task)
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }

  // fetching data from backend at first load
  useEffect(() => {
    const getTasks = () => {
      const tasksFromLocalDb = fetchTasks()
      setTasks(tasksFromLocalDb)
    }

    getTasks()
  }, [])

  return (
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? 
        <Tasks 
          tasks={tasks} 
          onDelete={deleteTask} 
          onToggle={toggleReminder}
        /> :
        <h4>Task list is empty</h4>
      }     
    </div>
  )
};

export default App