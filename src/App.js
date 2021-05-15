import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {

  const [tasks, setTasks] = useState([
    { 
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    { 
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 5th at 4:10pm',
      reminder: true,
    },
    { 
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 6th at 2:30pm',
      reminder: false,
    },
  ]);

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
    setTasks(tasks.map((task) => task.id !== id 
    ? task : {...task, reminder: !task.reminder}))
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