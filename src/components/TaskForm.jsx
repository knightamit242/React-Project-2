import { useEffect, useState } from "react"
import { useTasks } from "../context/TaskContext"

function TaskForm({ editingTask, setEditingTask }) {
  const { addTask, updateTask } = useTasks()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
    } else {
      setTitle("")
      setDescription("")
    }
  }, [editingTask])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) return

    if (editingTask) {
      await updateTask(
        editingTask.id,
        title,
        description
      )

      setEditingTask(null)
    } else {
      await addTask(title, description)
    }

    setTitle("")
    setDescription("")
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>
        {editingTask ? "Update Task" : "Add New Task"}
      </h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">
        {editingTask ? "Update Task" : "Add Task"}
      </button>

      {editingTask && (
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setEditingTask(null)}
        >
          Cancel
        </button>
      )}
    </form>
  )
}

export default TaskForm