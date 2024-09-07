import React, { useState, useEffect } from "react";
import Logo from "./assets/logo.svg";
import { IoSunnySharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };
    
    // Set initial theme
    updateTheme();
    
    // Add event listener for changes
    mediaQuery.addEventListener("change", updateTheme);
    
    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);
  
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => { 
    let t = todos.find(i => i.id === id); 
    setTodo(t.todo);
    let newTodos = todos.filter(item => item.id !== id); 
    setTodos(newTodos); 
    saveToLS();
  };

  const handleDelete = (id) => {  
    let newTodos = todos.filter(item => item.id !== id); 
    setTodos(newTodos); 
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo(""); 
    saveToLS();
  };

  const handleChange = (e) => { 
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => { 
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <div id="body" className={theme}>
      <div id="todo">
        <nav id="todo-nav">
          <div id="logo">
            <img className="svg" src={Logo} alt="Logo"/>
          </div>
          <div id="theme" onClick={toggleTheme}>
            <div id="light" className={theme === "dark" ? "hidden" : ""}>
              <FaMoon size={40}/>
            </div>
            <div id="dark" className={theme === "dark" ? "" : "hidden"}>
              <IoSunnySharp size={40}/>
            </div>
          </div>
        </nav>
        <section id="main">
          <div id="heading">
            <h1>Todo List</h1>
          </div>
          <div id="tasks">
            <div id="new">
              <input onChange={handleChange} value={todo} type="text" id="task-input" placeholder="Add a new task..."/>
              <button onClick={handleAdd} type="button" id="add-task" disabled={todo.length <= 1}>Save</button>
            </div>
            <br />
            <div id="done">
              <input onChange={toggleFinished} type="checkbox" name="Finished todos" id="finished" checked={showFinished} />
              <span>Show Finished</span>
            </div>
            <div id="border">
              <ul id="task-lists">
                {todos.length === 0 && <div id='text'>No Todos to display</div>}
                {todos.map(item => (
                  (showFinished || !item.isCompleted) && 
                  <li key={item.id}>
                    <div id="inttex">
                      <input 
                        type="checkbox" 
                        name={item.id} 
                        checked={item.isCompleted} 
                        onChange={() => handleCheckbox(item.id)}
                      />
                      <span className={item.isCompleted ? "line-through" : ""}>{item.todo}</span>
                    </div>
                    <div id="icons">
                      <button onClick={() => handleEdit(item.id)}><FaEdit /></button>
                      <button onClick={() => handleDelete(item.id)}><AiFillDelete /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
