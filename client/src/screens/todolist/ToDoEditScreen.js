import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./ToDoEditScreen.css";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { createNewTodo } from "../../actions/todoActions";
import Message from '../../components/message/Message'

const ToDoEditScreen = () => {
  const [ title, setTitle ] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { error, success } = useSelector(state => state.createTodo)

  useEffect(() => {
    if(success) {
      dispatch({type: 'CREATE_TODO_RESET'})
      navigate('/todolist')
    }
    return
  }, [success, dispatch, navigate])
  

  const submitHandler = (e) => {
    dispatch(createNewTodo(title))
  };

  return (
    <>
      <Navbar />
      { error && <Message type='error'>{error}</Message> }
      <div className='tde-container'>
        <div className='tde-box'>
          <h1 style={{ textAlign: "center" }}>New List</h1>
          <input className='tde-input' value={title} onChange={(e) => setTitle(e.target.value) } />
          <button
            className='tde-btn'
            id='tde-create'
            onClick={submitHandler} 
          >
            Create
          </button>
          <button
            className='tde-btn'
            id='tde-cancel'
            onClick={() => navigate("/todolist")}
          > Cancel </button>
        </div>
      </div>
    </>
  );
};

export default ToDoEditScreen;
