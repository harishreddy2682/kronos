import axios from "axios"
axios.defaults.withCredentials = true

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_LOGIN_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password }, config)

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/user/register', { name, email, password }, config)
 
        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data.verificationToken
        })

    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const activate = (otp, verificationToken) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_ACTIVATE_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/user/activate', { otp, verificationToken }, config)

        dispatch({
            type: 'USER_ACTIVATE_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'USER_ACTIVATE_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const logout = () => async (dispatch) => {
    try {
        await axios.get('http://localhost:5000/api/user/logout')

        dispatch({ type: 'USER_LOGOUT' })   
    } catch (err) {
        console.log(err.response.data.msg)
    }
}