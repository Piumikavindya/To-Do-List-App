import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomePage.css'; 
// import { Tooltip } from "flowbite-react";
// import { IconButton } from "@material-tailwind/react";
// import { MdDelete } from 'react-icons/md';
const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8002/task/viewAllTasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axios.post('http://localhost:8002/task/createTask', { taskName: newTask, description: '' });
        setTasks([...tasks, response.data.task]);
        setNewTask('');
      } catch (error) {
        console.error("Error adding task", error);
      }
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:8002/task/updateTask/${id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? response.data.task : task)));
      setEditTask(null);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8002/task/deleteTask/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleEditChange = (e) => {
    setEditTask({ ...editTask, taskName: e.target.value });
  };

  const toggleTaskCompletion = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(task._id, updatedTask);
  };

  return (
    <div className="container">
      <p>To-Do List</p>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task)}
            />
            {editTask && editTask._id === task._id ? (
              <input type="text" value={editTask.taskName} onChange={handleEditChange} />
            ) : (
              <span className={task.completed ? 'task-completed' : ''}>
                {task.taskName}
              </span>
            )}
        <div className="task-actions">
  {editTask && editTask._id === task._id ? (
    <button className="edit-button" onClick={() => updateTask(task._id, editTask)}>Save</button>
  ) : (
    <button className="edit-button" onClick={() => setEditTask(task)}>Edit</button>
  )}
  <button className="delete-button" onClick={() => deleteTask(task._id)}>Delete</button>
</div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
