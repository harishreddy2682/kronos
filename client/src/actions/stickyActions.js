import axios from 'axios'
axios.defaults.withCredentials = true


export const getAllStickies = () => async (dispatch) => {
    try {
        dispatch({
            type: 'GET_STICKIES_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.get('http://localhost:5000/api/sticky/getAll', config)

        dispatch({
            type: 'GET_STICKIES_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'GET_STICKIES_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const deleteSticky = (stickyId) => async (dispatch) => {
    try {
        dispatch({
            type: 'DELETE_STICKY_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/sticky/delete', { stickyId }, config)

        dispatch({
            type: 'DELETE_STICKY_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'DELETE_STICKY_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const createSticky = () => async (dispatch) => {
    try {
        dispatch({
            type: 'CREATE_STICKY_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/sticky/create', {}, config)

        dispatch({
            type: 'CREATE_STICKY_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'CREATE_STICKY_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const getSticky = (stickyId) => async (dispatch) => {
    try {
        dispatch({
            type: 'GET_STICKY_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/sticky/getOneSticky', { stickyId }, config)

        dispatch({
            type: 'GET_STICKY_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'GET_STICKY_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const updateSticky = (stickyId, title, content) => async (dispatch) => {
    try {
        dispatch({
            type: 'UPDATE_STICKY_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/sticky/update', { stickyId, title, content }, config)

        dispatch({
            type: 'UPDATE_STICKY_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'UPDATE_STICKY_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}