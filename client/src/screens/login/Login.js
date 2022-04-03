import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import "./login.css";
import { login } from "../../actions/userActions";
import Message from '../../components/message/Message'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { userInfo, error } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password))
  };


  return (
    <>

      {error && <Message  >{error}</Message>}

      <div className='login-container'>
        <h1>Kronos</h1>
        <p style={{ "margin": "0 0 4vh 0", "color": "rgba(0,0,0,0.6)" }}>"Kronos is a greek god of time" - Google</p>
        <div className='login-box'>
          <h3>Sign In</h3>
          <form className='login-form' onSubmit={submitHandler}>
            <label htmlFor='email'>Email</label>
            <input
              autoComplete='off'
              placeholder='Enter Email'
              type='email'
              id='login-email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
            />
            <label htmlFor='password'>Password</label>
            <input
              placeholder='Enter Password'
              autoComplete='off'
              type='password'
              id='login-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
            />
            <button id='login-btn' type='submit'>
              Login
            </button>
            <div className='login-bottom-text'>
              New user?{" "}
              <Link to={"/register"} style={{ color: "black" }}>
                <strong>Register</strong>
              </Link>{" "}
              here.
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;