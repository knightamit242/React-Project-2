import { Link } from "react-router-dom"
import { useTasks } from "../context/TaskContext"

function Dashboard() {
  const {
    tasks,
    todoTasks,
    progressTasks,
    completedTasks,
  } = useTasks()

  return (
    <main className="container">
      <div className="dashboard-header">
        <div>
          <h1>TaskFlow Dashboard</h1>
          <p>Manage your tasks easily.</p>
        </div>

        <Link to="/tasks" className="primary-btn">
          Manage Tasks
        </Link>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h2>{tasks.length}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <h2>{todoTasks.length}</h2>
          <p>To Do</p>
        </div>

        <div className="stat-card">
          <h2>{progressTasks.length}</h2>
          <p>In Progress</p>
        </div>

        <div className="stat-card">
          <h2>{completedTasks.length}</h2>
          <p>Completed</p>
        </div>
      </div>
    </main>
  )
}

export default Dashboard