import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { register } from "../../actions/userActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector(state => state.userLogin)
  const { success } = useSelector(state => state.register)

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
    if (success){
      navigate('/verify')
      dispatch({ type: 'USER_REGISTER_RESET_SUCCESS' })
    }
    return
  }, [navigate, userInfo, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password))
  };


  return (
    <div className='register-container'>
      <h1>Kronos</h1>
      <p style={{"margin": "0 0 4vh 0", "color" : "rgba(0,0,0,0.6)"}}>"Kronos is a greek god of time" - Google</p>
      <div className='register-box'>
        <h3>Register</h3>
        <form onSubmit={submitHandler}>
          <label htmlFor='name'>Name</label>
          <input
            autoComplete='off'
            placeholder='Enter name'
            type='text'
            id='register-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='name'
          />
          <label htmlFor='email'>Email</label>
          <input
            autoComplete='off'
            placeholder='Enter Email'
            type='email'
            id='register-email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
          />

          <label htmlFor='password'>Password</label>
          <input
            placeholder='Enter Password'
            type='password'
            id='register-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
          />
          <button id='register-btn' type='submit'>
            Register
          </button>
        </form>

        <div className='register-bottom-text'>
          Already a user?{" "}
          <Link to={"/"} style={{ color: "black" }}>
            <strong>Login</strong>
          </Link>{" "}
          here.
        </div>
      </div>
    </div>
  );
};

export default Register;