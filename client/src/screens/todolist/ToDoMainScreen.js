import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import "./ToDoMainScreen.css";
import { getTodoLists, deleteTodo } from "../../actions/todoActions";
import Message from '../../components/message/Message'

const ToDoMainScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { taskList } = useSelector(state => state.todoLists)
  const { success } = useSelector(state => state.deleteTodo)

  function deleteHandler(id) {
    dispatch(deleteTodo(id))
  }

  useEffect(() => {
    if (success) {
      dispatch(getTodoLists())
      dispatch({ type: 'DELETE_TODO_RESET' })
      return
    }
    dispatch(getTodoLists())
  }, [dispatch, success])

  return (
    <>
      <Navbar />
      {success && <Message type='success'>{success.msg}</Message>}
      <div className='todo-ms-header'>
        <h3>To-Dos</h3>
      </div>
      <div className='todo-ms-container' >
        {taskList.length !== 0 ? (
          taskList.map((item) => (
            <div className='todo-ms-box' key={item._id} >
              <div className='todo-ms-box-text'>{item.title}</div>
              <i
                className='material-icons todo-ms-icon'
                id='tdms-delete'
                onClick={() => deleteHandler(item._id)}
              >
                delete
              </i>
              <i
                className='material-icons todo-ms-icon'
                id='tdms-edit'
                onClick={() => navigate(`/todolist/tasks/${item._id}`)}
              >
                edit
              </i>
            </div>
          ))
        ) : (
          <div className='no-todos-container'>
            <p>
              Please click on the <strong>+</strong> button on the bottom right
              to create a To-Do List
            </p>{" "}
          </div>
        )}
        <div className='todo-ms-add-btn' onClick={() => navigate("/todolist/new")}>
          <i className='material-icons todo-ms-add-icon'>add</i>
        </div>
      </div>
    </>
  );
};

export default ToDoMainScreen;
