import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function addTasks(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function removeInput() {
    setInputValue("");
  }

  function removeTask(taskIndex) {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  }

  return (
    <div className="container">
      <h1 className="title">SimpleTodo</h1>

      <div className="addtasks">
        <input
          type="text"
          placeholder="Task"
          value={inputValue}
          onChange={handleInputChange}
          className="input"
        />
        <button
          onClick={() => {
            addTasks(inputValue);
            removeInput();
          }}
          className="addButton"
        >
          Add Task
        </button>
      </div>

      <ul className="tasks">
        {tasks.map((task, index) => (
          <div className="task">
            <li key={index} className="list">
              {task}
            </li>
            <button
              onClick={() => {
                removeTask(index);
              }}
              className="removeButton"
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
