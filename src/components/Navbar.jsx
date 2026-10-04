import { Link } from "react-router-dom"
import { useTasks } from "../context/TaskContext"

function Navbar() {
  const { tasks } = useTasks()

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        TaskFlow
      </Link>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/tasks">Tasks ({tasks.length})</Link>
      </div>
    </nav>
  )
}

export default Navbar