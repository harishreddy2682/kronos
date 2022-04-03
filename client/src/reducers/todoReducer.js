
export const todoListsReducer = (state = { taskList: [] }, action) => {
    switch (action.type) {
        case 'GET_TODOS_REQUEST':
            return { loading: true, ...state }
        case 'GET_TODOS_SUCCESS':
            return { loading: false, taskList: action.payload }
        case 'GET_TODOS_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const todoCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_TODO_REQUEST':
            return { loading: true, ...state }
        case 'CREATE_TODO_SUCCESS':
            return { loading: false, success: action.payload }
        case 'CREATE_TODO_FAIL':
            return { loading: false, error: action.payload }
        case 'CREATE_TODO_RESET':
            return {}
        default:
            return state
    }
}

export const todoDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_TODO_REQUEST':
            return { loading: true, ...state }
        case 'DELETE_TODO_SUCCESS':
            return { loading: false, success: action.payload }
        case 'DELETE_TODO_FAIL':
            return { loading: false, error: action.payload }
        case 'DELETE_TODO_RESET':
            return {}
        default:
            return state
    }
}

export const getTasksReducer = (state = { tasks: [] }, action) => {
    switch (action.type) {
        case 'GET_TASKS_REQUEST':
            return { loading: true, ...state }
        case 'GET_TASKS_SUCCESS':
            return { loading: false, todoList: action.payload, tasks: action.payload.items }
        case 'GET_TASKS_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const addTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TASK_REQUEST':
            return { loading: true, ...state }
        case 'ADD_TASK_SUCCESS':
            return { loading: false, success: action.payload }
        case 'ADD_TASK_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_TASK_REQUEST':
            return { loading: true, ...state }
        case 'DELETE_TASK_SUCCESS':
            return { loading: false, success: action.payload }
        case 'DELETE_TASK_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}