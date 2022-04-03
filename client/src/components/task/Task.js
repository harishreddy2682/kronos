import React from "react";
import "./Task.css";
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../actions/todoActions'

function Task({ text, todoId, color }) {

  const dispatch = useDispatch()

  const deleteHandler = () => {
    dispatch(deleteTask(todoId, text))
  }

  return (
    <>
      <div
        className='task'
        onClick={deleteHandler}
      >
        <div className='todo-btnText'>{text}</div>
      </div>
    </>
  );
}

export default Task;
