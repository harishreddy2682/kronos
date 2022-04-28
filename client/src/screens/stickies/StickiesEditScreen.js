import React, { useEffect, useState } from "react";
import "./StickiesEditScreen.css";
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../../components/navbar/Navbar";
import Message from '../../components/message/Message'
import { useDispatch, useSelector } from "react-redux";
import { getSticky, updateSticky, deleteSticky } from "../../actions/stickyActions";

const StickiesEditScreen = () => {

  const dispatch = useDispatch()

  const { id: stickyId } = useParams()

  const navigate = useNavigate()

  const { sticky } = useSelector(state => state.getSticky)
  const { success: updateSuccess } = useSelector(state => state.updateSticky)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!sticky) {
      dispatch(getSticky(stickyId))
    } else {
      setTitle(sticky.title)
      setContent(sticky.content)
    }
  }, [dispatch, stickyId, sticky])

  useEffect(() => {
    dispatch(getSticky(stickyId))
    if (updateSuccess) {
      dispatch({
        type: 'UPDATE_STICKY_RESET'
      })
      navigate('/stickies')
    }
  }, [dispatch, stickyId, updateSuccess, navigate])

  const saveHandler = () => {
    dispatch(updateSticky(stickyId, title, content))
  }

  function deleteHandler() {
    dispatch(deleteSticky(sticky._id))
    navigate('/stickies')
  }

  return (
    <>
      <Navbar />
      {updateSuccess && <Message type='success' >{updateSuccess.msg}</Message>}
      <div className='sticky-edit-body'>
        <div className='sticky-edit-container'>
          <div className='sticky-edit-box'>
            <input type='text' id='sticky-edit-title' spellCheck='false' value={title} onChange={e => setTitle(e.target.value)} />

            <textarea id='sticky-edit-content' spellCheck='false' value={content} onChange={e => setContent(e.target.value)} />
            <div className='sticky-edit-save-btn'>
              <i className='material-icons edit-save-btn' onClick={saveHandler} >save</i>
            </div>
            <div className='sticky-edit-delete-btn'>
              <i className='material-icons edit-delete-btn' onClick={deleteHandler}>delete</i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickiesEditScreen;
