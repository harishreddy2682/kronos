import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OTPInput from "otp-input-react";
import { useDispatch, useSelector } from 'react-redux'
import { activate } from '../../actions/userActions';

const Otp = () => {
    const [otp, setOtp] = useState(0);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { activationToken } = useSelector(state => state.register)
    const { success } = useSelector(state => state.activate)
    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if (userInfo) {
            navigate('/home')
        }
        if (success)
            navigate('/')
        return
    }, [navigate, userInfo, success]);

    const submitHandler = (e) => {
        dispatch(activate(otp, activationToken))
    }

    return (
        <>
            <div className='register-container'>
                <h1>Kronos</h1>
                <p style={{ "margin": "0 0 4vh 0", "color": "rgba(0,0,0,0.6)" }}>"Kronos is a greek god of time" - Google</p>
                <div className='register-box'>
                    <h3>OTP</h3>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        autoFocus
                        OTPLength={4}
                        otpType='number'
                        inputStyles={{ fontFamily: `"Nunito", sans-serif` }}
                        style={{
                            marginLeft: "8%",
                        }}

                    />
                    <p id='otp-text'>
                        The OTP is sent to your mail. Please check your mail
                    </p>
                    <button id='register-btn' type='submit' onClick={submitHandler} >
                        Submit
                    </button>


                </div>
            </div>
        </>
    )
}

export default Otp