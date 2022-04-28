import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/login/Login';
import Home from './screens/home/Home'
import Register from './screens/register/Register';
import Otp from './screens/otp/Otp';
import ToDoMainScreen from './screens/todolist/ToDoMainScreen';
import ToDoEditScreen from './screens/todolist/ToDoEditScreen'
import ToDoListScreen from './screens/todolist/ToDoListScreen'
import StickiesScreen from './screens/stickies/StickiesScreen';
import StickiesEditScreen from './screens/stickies/StickiesEditScreen';
import HydrationScreen from './screens/hydration-tracker/HydrationScreen'
import PomodoroScreen from './screens/pomodoro/PomodoroScreen'
import ValuationCarousel from './screens/valuationCarousel/ValuationCarousel';
import axios from 'axios'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUser } from './utils/getLoggedUser'
axios.defaults.withCredentials = true


function App() {

  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (userInfo === null) {
      dispatch(getLoggedUser())
    }
  }, [dispatch, userInfo])
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
        <Route path='/stickies' element={<StickiesScreen />} />
        <Route path='/stickies/edit/:id' element={<StickiesEditScreen />} />
        <Route path='/hydration-tracker' element={<HydrationScreen />} />
        <Route path='/pomodoro' element={<PomodoroScreen />} />
        <Route path='/phase2' element={<ValuationCarousel />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
