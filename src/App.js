import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {

  const [tasks, setTasks] = useState([
   {
      "text": "Sample Task",
      "day": "24th July, Friday @ 7pm",
      "reminder": true,
      "id": 1
    }, 
  ])

  const [showAddTask, setShowAddTask] = useState(false)

  // Add task
  const addTask = (task) => {
    setTasks([...tasks, {id: tasks.length+1, ...task}])
  }

  // delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id 
    ? {...task, reminder: !task.reminder} : task))
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

export default App