import './home.css'
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
axios.defaults.withCredentials = true

const Home = () => {

  const { userInfo } = useSelector( state => state.userLogin )
  const navigate = useNavigate()

  useEffect(() => {
    if(!userInfo){
      navigate('http://127.0.0.1:5500/index.html')
    }
  }, [userInfo, navigate])

  return (
    <>
      <Navbar userInfo={userInfo} />
    
      <div>Home</div>
    </>
  )
}

export default Home