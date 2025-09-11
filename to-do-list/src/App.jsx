import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredTasks = tasks.filter(task => filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed)

  return (    
    <>
    <div className='container-fluid px-3 px-md-5'>
      <h1 className='text-center mb-4'>Lista de Tareas</h1>
      <form className="task-form mb-4" onSubmit={(e) => {e.preventDefault(); setTasks([...tasks, {text: newTask, completed: false}]); setNewTask('')}}>
        <div className='row g-2'>
          <div className='col-12 col-md-8 col-lg-9'>
            <input 
              className='form-control' 
              type="text" 
              placeholder="Agrega una nueva tarea" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)} 
            />
          </div>
          <div className='col-12 col-md-4 col-lg-3'>
            <button className='btn btn-primary w-100' type="submit">Agregar tarea</button>
          </div>
        </div>
      </form> 
      
      <div className='task-counter'>
        <p>Tareas: {tasks.length}</p>
        <div className='task-filter'>
          <button className='btn btn-outline-primary m-2 p-2 rounded-2' onClick={() => setFilter('all')}>Todas</button>
          <button className='btn btn-outline-primary m-2 p-2 rounded-2' onClick={() => setFilter('completed')}>Completadas</button>
          <button className='btn btn-outline-primary m-2 p-2 rounded-2' onClick={() => setFilter('pending')}>Pendientes</button>
        </div>
      </div>

      <div className='task-container'>
        <ul className='task-list'>
          {filteredTasks.map((task, index) => 
          <li key={index} className='task-item'>{task.text} 
            {task.completed === false && <button className='btn btn-danger m-2 position-relative' onClick={() => setTasks(tasks.filter(t => t.text !== task.text))}><i class="fa fa-times" aria-hidden="true"></i>
            </button>}

            {task.completed === false && <button className='btn btn-success m-2 p-2 rounded-2' onClick={() => setTasks(tasks.map(t => t.text === task.text ? {...t, completed: !t.completed} : t))}><i class="fa fa-check" aria-hidden="true"></i></button>}

            {task.completed !== false && <p className='d-inline m-2 p-2 rounded-2 text-success'><i class="fa fa-check" aria-hidden="true"></i>
            </p>}
            </li>
          )}
          {filteredTasks.length === 0 && <li className='task-item'>No hay tareas</li>}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App
