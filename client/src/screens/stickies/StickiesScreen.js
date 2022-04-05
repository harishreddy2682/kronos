import React, { useEffect } from "react";
import "./StickiesScreen.css";
import Navbar from "../..//components/navbar/Navbar";
import Sticky from "../../components/sticky/Sticky";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getAllStickies, deleteSticky, createSticky } from "../../actions/stickyActions";


const StickiesScreen = () => {

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { stickies } = useSelector(state => state.stickiesList)
  const { success: deleteSuccess } = useSelector(state => state.deleteSticky)
  const { success: createSuccess } = useSelector(state => state.createSticky)

  useEffect(() => {
    dispatch(getAllStickies())
  }, [dispatch, deleteSuccess, createSuccess])

  const navigate = useNavigate();
  
  function deleteHandler(stickyId) {
    dispatch(deleteSticky(stickyId))
  }

  function addHandler() {
    dispatch(createSticky())
  }

  function editHandler(stickyId) {
    navigate(`/stickies/edit/${stickyId}`);
  }

  return (
    <>
      <Navbar />
      <div className='stickies-header'>
        <h3>stickies</h3>
        <p>Welcome, {userInfo && userInfo.name}!</p>
      </div>
      <div className='stickies-container'>
        {stickies.map(({ title, content, _id }, index) => {
          return (
            <Sticky
              key={index}
              stickyId={_id}
              content={content}
              title={title}
              onDelete={deleteHandler}
              onEdit={editHandler}
            />
          );
        })}
      </div>
      <div className='sticky-add-btn' onClick={addHandler}>
        <i className='material-icons sticky-add-icon'>add</i>
      </div>
    </>
  );
};

export default StickiesScreen;
