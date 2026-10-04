import { createContext, useContext, useEffect, useState } from "react"

const TaskContext = createContext()

const API_URL = "https://dummyjson.com/todos"

const defaultTasks = [
  {
    id: 1,
    title: "Learn React",
    description: "Learn React fundamentals",
    status: "todo",
  },
  {
    id: 2,
    title: "Build TaskFlow",
    description: "Create project management dashboard",
    status: "progress",
  },
  {
    id: 3,
    title: "Complete JavaScript",
    description: "Revise JavaScript concepts",
    status: "completed",
  },
]

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskflow-tasks")

    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks))
  }, [tasks])

  
  const fetchTasks = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}?limit=10`)

      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const data = await response.json()

      const apiTasks = data.todos.map((task) => ({
        id: task.id,
        title: task.todo,
        description: "Task loaded from REST API",
        status: task.completed ? "completed" : "todo",
      }))

      setTasks(apiTasks)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (tasks.length === 0) {
      fetchTasks()
    }
  }, [])


  const addTask = async (title, description) => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: title,
          completed: false,
          userId: 1,
        }),
      })

      const data = await response.json()

      const newTask = {
        id: data.id || Date.now(),
        title: data.todo,
        description,
        status: "todo",
      }

      setTasks((prevTasks) => [newTask, ...prevTasks])
    } catch (error) {
      console.log(error)
    }
  }

 
  const updateTask = async (id, title, description) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: title,
        }),
      })

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, title, description }
            : task
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  
  const updateTaskStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: status === "completed",
        }),
      })

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, status }
            : task
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      )
    } catch (error) {
      console.log(error)
    }
  }

  const todoTasks = tasks.filter((task) => task.status === "todo")

  const progressTasks = tasks.filter(
    (task) => task.status === "progress"
  )

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  )

  return (
    <TaskContext.Provider
      value={{
        tasks,
        todoTasks,
        progressTasks,
        completedTasks,
        loading,
        fetchTasks,
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}