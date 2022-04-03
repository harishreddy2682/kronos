import axios from "axios"
axios.defaults.withCredentials = true

export const getTodoLists = () => async (dispatch) => {
    try {
        dispatch({
            type: 'GET_TODOS_REQUEST'
        })

        const { data } = await axios.get('http://localhost:5000/api/todo/getAllTodo')

        dispatch({
            type: 'GET_TODOS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'GET_TODOS_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const createNewTodo = (title) => async (dispatch) => {
    try {
        dispatch({
            type: 'CREATE_TODO_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/todo/create', { title }, config)

        dispatch({
            type: 'CREATE_TODO_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'CREATE_TODO_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const deleteTodo = (todoId) => async (dispatch) => {
    try {
        dispatch({
            type: 'DELETE_TODO_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/todo/delete', { todoId }, config)

        dispatch({
            type: 'DELETE_TODO_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'DELETE_TODO_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const getTasks = (todoId) => async (dispatch) => {
    try {
        dispatch({
            type: 'GET_TASKS_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/todo/getTodo', { todoId }, config)

        dispatch({
            type: 'GET_TASKS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'GET_TASKS_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const addTask = (todoId, item) => async (dispatch) => {
    try {
        dispatch({
            type: 'ADD_TASK_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/todo/addItem', { todoId, item  }, config)

        dispatch({
            type: 'ADD_TASK_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'ADD_TASK_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}

export const deleteTask = (todoId, task) => async (dispatch) => {
    try {
        dispatch({
            type: 'DELETE_TASK_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/todo/deleteItem', { todoId, task }, config)

        dispatch({
            type: 'DELETE_TASK_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ type: 'DELETE_TASK_FAIL', payload: error.response && error.response.data.msg ? error.response.data.msg : error.message })
    }
}