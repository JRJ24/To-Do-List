import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredTasks = tasks.filter(task => filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed)

  return (
    <>
      <div className='container py-5'>
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <h1 className='text-center mb-4 fw-bold text-primary'>:) Lista de Tareas</h1>
            {/* Formulario */}
            <form
              className="mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                setTasks([...tasks, { text: newTask, description: newDescription, completed: false }]);
                setNewTask('');
                setNewDescription('');
              }}
            >
              <div className='row g-3'>
                <div className='col-md-6'>
                  <input
                    className='form-control rounded-3 shadow-sm'
                    type="text"
                    placeholder="Agrega una nueva tarea"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    className='form-control rounded-3 shadow-sm'
                    type="text"
                    placeholder="Agrega una descripción"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <div className="col-12 text-center">
                  <button className='btn btn-primary w-50 rounded-3 shadow' type="submit">
                    ➕ Agregar tarea
                  </button>
                </div>
              </div>
            </form>

            {/* Contador y filtros */}
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <p className="fw-semibold text-secondary">📌 Tareas: {tasks.length}</p>
              <div className='task-filter'>
                <button className='btn btn-outline-primary btn-sm m-1 rounded-pill' onClick={() => setFilter('all')}>Todas</button>
                <button className='btn btn-outline-success btn-sm m-1 rounded-pill' onClick={() => setFilter('completed')}>Completadas</button>
                <button className='btn btn-outline-warning btn-sm m-1 rounded-pill' onClick={() => setFilter('pending')}>Pendientes</button>
              </div>
            </div>

            {/* Lista de tareas */}
            <ul className='list-group'>
              {filteredTasks.map((task, index) =>
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm ${task.completed ? 'list-group-item-success' : ''}`}
                >
                  <div>
                    <span className={`fw-semibold ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                      {task.text}
                    </span>
                    {task.description && <small className="d-block text-muted fst-italic">📝 {task.description}</small>}
                  </div>

                  <div>
                    {!task.completed && (
                      <>
                        <button
                          className='btn btn-danger btn-sm rounded-circle mx-1 shadow-sm'
                          onClick={() => setTasks(tasks.filter(t => t.text !== task.text))}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                        <button
                          className='btn btn-success btn-sm rounded-circle mx-1 shadow-sm'
                          onClick={() => setTasks(tasks.map(t => t.text === task.text ? { ...t, completed: !t.completed } : t))}
                        >
                          <i className="fa fa-check"></i>
                        </button>
                      </>
                    )}
                    {task.completed && (
                      <span className="badge bg-success px-3 py-2 rounded-pill">
                        ✅ Completada
                      </span>
                    )}
                  </div>
                </li>
              )}
              {filteredTasks.length === 0 && (
                <li className='list-group-item text-center text-muted py-3 rounded-3 shadow-sm'>
                  🎉 No hay tareas
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className='text-center mt-4'>
          <p>© 2025 Lista de Tareas. Creado por Jonaifry Rodriguez.</p>
        </div>
      </div>
    </>
  )
}

export default App
