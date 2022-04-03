import React, { useState, useEffect } from "react";
import "./ToDoListScreen.css";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from "../../actions/todoActions";
import Task from "../../components/task/Task";
import Navbar from "../../components/navbar/Navbar";
import { addTask } from "../../actions/todoActions";

function App() {
  const [userInput, setUserInput] = useState("");

  const { id: todoId } = useParams()
  const dispatch = useDispatch()

  const { todoList, tasks } = useSelector(state => state.getTasks)
  const { success: addSuccess } = useSelector(state => state.addTask)
  const { success: deleteSuccess } = useSelector(state => state.deleteTask)

  useEffect(() => {
    dispatch(getTasks(todoId))
  }, [dispatch, todoId, addSuccess, deleteSuccess])

  const date = new Date();
  const today = date.getDate();

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function addHandler(e) {
    dispatch(addTask(todoId, userInput))
    setUserInput('')
  }

  return (
    <>
      <Navbar />
      <div className='todo-center'>
        <div className='todo-box'>
          <div className='todo-detailsSection'>
            <h2>
              {weekDays[date.getDay()]}, {`${today}`}
              {today === 1 || today === 21 || today === 31
                ? "st"
                : today === 2 || today === 22
                  ? "nd"
                  : today === 3 || today === 23
                    ? "rd"
                    : "th"}
            </h2>
            <div className='todo-container'>
              <span id='todo-month'>{months[date.getMonth()]}</span>
              <span id='todo-numTasks'>
                <strong>{tasks.length}</strong> Tasks
              </span>
            </div>
          </div>
          <hr className='todo-hr' />
          <input
            type='text'
            id='todo-taskInput'
            placeholder='Enter a task here'
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />
          <div
            className='todo-btn'
            onClick={userInput === "" ? undefined : addHandler}
          >
            <div className='todo-btnText'>Add</div>
          </div>
          <hr className='todo-hr' />
          {tasks.length === 0 ? (
            <div className='todo-error'>
              <h2>Oops..</h2>
              <p>
                You have no tasks. Make a new task by entering a task above!
              </p>
            </div>
          ) : (
            tasks.map((task, index) => {
              return (
                <Task
                  todoId={todoId}
                  key={index}
                  text={task}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
