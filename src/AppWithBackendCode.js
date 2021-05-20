import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {

  const [tasks, setTasks] = useState([])

  const [showAddTask, setShowAddTask] = useState(false)

  // fetching data from backend at first load
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const json = await response.json()
    return json;
  }
 
  // Fetch single task
  const fetchSingleTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const json = await response.json()
    return json;
  }

  // Add task
  const addTask = async (task) => {
    const options = {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(task),
    }
    const res = await fetch('http://localhost:5000/tasks', options)
    const data = await res.json()
    setTasks([...tasks, data])
    // setTasks([...tasks, {id: tasks.length+1, ...task}])
  }

  // delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{method: 'DELETE'})
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchSingleTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const options = {
      method: "PUT",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updatedTask),
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, options)
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id 
    ? {...task, reminder: data.reminder} : task))
  }

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

export default App;