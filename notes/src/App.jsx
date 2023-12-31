import React, { useState, useEffect } from 'react';
import Task from './Task';
import './App.css';

const App = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false, color: getRandomColor() }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFD700', '#7CFC00', '#00CED1'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="app">
      <div className="header">
        <h1>TO-DO LIST</h1>
        <div className="motivation">
          <p>
            Kendinizi sınırlamayın. Çoğu insan yapabileceklerini düşündükleri şeyler konusunda kendilerini
            sınırlarlar. Sadece zihninizin gidebildiği kadar ileriye gidebilirsiniz. Neye inanırsanız, onu yapabilirsiniz.
            <br />- Mary Kay Ash
          </p>
        </div>
      </div>
      <div className="task-input-container">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Yeni görev ekle..."
        />
        <button onClick={handleAddTask}>Ekle</button>
      </div>
      <div className="tasks-container">
        {tasks.map((task, index) => (
          <Task
            key={index}
            text={task.text}
            completed={task.completed}
            color={task.color}
            onDelete={() => handleDeleteTask(index)}
            onToggleComplete={() => handleToggleComplete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
