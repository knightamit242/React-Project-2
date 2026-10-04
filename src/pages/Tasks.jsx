import { useState } from "react"
import TaskCard from "../components/TaskCard"
import TaskForm from "../components/TaskForm"
import { useTasks } from "../context/TaskContext"

function Tasks() {
  const {
    tasks,
    todoTasks,
    progressTasks,
    completedTasks,
    fetchTasks,
    loading,
  } = useTasks()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [editingTask, setEditingTask] = useState(null)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filter === "all" || task.status === filter

    return matchesSearch && matchesFilter
  })

  const getTasks = (status) => {
    return filteredTasks.filter(
      (task) => task.status === status
    )
  }

  return (
    <main className="container">
      <h1>Tasks</h1>

      <TaskForm
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      <div className="controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={fetchTasks}>
          {loading ? "Loading..." : "Load API Tasks"}
        </button>
      </div>

      <div className="kanban">
        <div className="kanban-column">
          <h2>To Do</h2>

          {getTasks("todo").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setEditingTask}
            />
          ))}
        </div>

        <div className="kanban-column">
          <h2>In Progress</h2>

          {getTasks("progress").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setEditingTask}
            />
          ))}
        </div>

        <div className="kanban-column">
          <h2>Completed</h2>

          {getTasks("completed").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setEditingTask}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Tasks