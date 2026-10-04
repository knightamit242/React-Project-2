import { useTasks } from "../context/TaskContext"

function TaskCard({ task, onEdit }) {
  const { updateTaskStatus, deleteTask } = useTasks()

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <select
        value={task.status}
        onChange={(e) =>
          updateTaskStatus(task.id, e.target.value)
        }
      >
        <option value="todo">To Do</option>
        <option value="progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <div className="task-actions">
        <button onClick={() => onEdit(task)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard