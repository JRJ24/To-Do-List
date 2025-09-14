import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Routes } from './config/index.js'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [filter, setFilter] = useState('all')
  const usuarioID = localStorage.getItem('usuarioID');


  useEffect(() => {
    fetch(Routes.Task)
      .then(res => res.json())
      .then(data => {
        setTasks(data.data);
        setFilter(data.data)
      })
      .catch(err => console.log(err))
  }, [])



  const filteredTasks = tasks.filter(task => filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed);
  // const filteredTasksByUser = tasks.filter(task => task.user._id === usuarioID);
 

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
                setTasks([...tasks, { title: newTask, description: newDescription, completed: false }]);
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
                  <button className='btn btn-primary w-50 rounded-3 shadow' type="submit"
                    onClick={async () => {
                      try {
                        const response = await fetch(`${Routes.CreateTask}`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ title: newTask, description: newDescription, user: usuarioID })
                        })
                        if (!response.ok) {
                          throw new Error('Error al crear la tarea')
                        }
                        const data = await response.json()
                        console.log(data)
                        setTasks([...tasks, data.data])
                        setNewTask('')
                        setNewDescription('')
                      } catch (err) {
                        console.log(err)
                      }
                    }}
                  >
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
              {(filteredTasks || []).map((task, index) => 
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm ${task.completed ? 'list-group-item-success' : ''}`}
                >
                  <div>
                    {/* Tarea */}
                    <span className={`fw-semibold ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                      {task.title}
                    </span>
                    {/* Descripción */}
                    {task.description && <small className="d-block text-muted fst-italic">📝 {task.description}</small>}
                    {/* Fecha de creación */}
                    {task.createdAt && <small className="d-block text-muted fst-italic">📅 {task.createdAt}</small>}
                  </div>

                  <div >
                    {/* Botones de acciones */}
                    {!task.completed && (
                      <>
                        {/* Eliminar una tarea */}
                        <button
                          className='btn btn-danger btn-sm rounded-circle mx-1 shadow-sm'
                          onClick={async () => {
                            setTasks(tasks.filter(t => t.title !== task.title))
                            try {
                              const response = await fetch(`${Routes.DeleteTask}/${task._id}`, {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                              })
                              if (!response.ok) {
                                throw new Error('Error al eliminar la tarea')
                              }
                              await response.json()
                            } catch (err) {
                              console.log(err)
                            }
                          }}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                        {/* Editar una tarea */}
                        <button
                          className='btn btn-warning btn-sm rounded-circle mx-1 shadow-sm'
                          onClick={async() => {
                            const title = prompt('Ingrese el nuevo titulo', task.title)
                            const description = prompt('Ingrese la nueva descripcion', task.description)
                            try{
                              const response = await fetch(`${Routes.UpdateTask}/${task._id}`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ title: title, description: description })
                              })
                              if (!response.ok) {
                                throw new Error('Error al actualizar la tarea')
                              }
                              await response.json()
                              setTasks(prev =>
                                prev.map(t => (t._id === task._id ? { ...t, title, description } : t))
                              );
                            }catch(err){
                              console.log(err);
                            }
                          }}
                        >
                          <i class="fa fa-pencil-square" aria-hidden="true"></i>
                        </button>
                        {/* Completar una tarea */}
                        <button
                          className='btn btn-success btn-sm rounded-circle mx-1 shadow-sm'
                          onClick={async () => {
                            setTasks(tasks.map(t => t.title === task.title ? { ...t, completed: !t.completed } : t))
                            try {
                              const response = await fetch(`${Routes.UpdateTask}/${task._id}`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ completed: !task.completed })
                              })
                              if (!response.ok) {
                                throw new Error('Error al actualizar la tarea')
                              }
                              await response.json()
                            } catch (err) {
                              console.log(err)
                            }
                          }}
                        >
                          <i className="fa fa-check"></i>
                        </button>
                      </>
                    )}
                    {task.completed && (
                      <span className="badge bg-success px-3 py-2 rounded-pill">
                        ✅ Completada
                        <button
                          className='btn btn-danger btn-sm rounded-circle mx-1 shadow-sm'
                          onClick={async () => {
                            setTasks(tasks.filter(t => t.title !== task.title))
                            try {
                              const response = await fetch(`${Routes.DeleteTask}/${task._id}`, {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                              })
                              if (!response.ok) {
                                throw new Error('Error al eliminar la tarea')
                              }
                              await response.json()
                            } catch (err) {
                              console.log(err)
                            }
                          }}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </span>
                    )}
                  </div>
                </li>
              )}
              {filteredTasks.length === 0 && (
                <li className='list-group-item text-center text-muted py-3 rounded-3 shadow-sm'>
                  🎉 No hay tareas para mostrar de este usuario
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
