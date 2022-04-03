import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/login/Login';
import Home from './screens/home/Home'
import Register from './screens/register/Register';
import Otp from './screens/otp/Otp';
import ToDoMainScreen from './screens/todolist/ToDoMainScreen';
import ToDoEditScreen from './screens/todolist/ToDoEditScreen'
import ToDoListScreen from './screens/todolist/ToDoListScreen'
import axios from 'axios'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
axios.defaults.withCredentials = true


function App() {

  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/')
        if (res.status === 200) {
          dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: res.data
          })
        }
      } catch (error) {
        dispatch({ type: 'USER_LOGOUT' })
      }
    }
    if (!userInfo) {
      getLoggedUser()
    }
  }, [userInfo, dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify' element={<Otp />} />
        <Route path='/todolist' element={<ToDoMainScreen />} />
        <Route path='/todolist/new' element={<ToDoEditScreen />} />
        <Route path='/todolist/tasks/:id' element={<ToDoListScreen />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
