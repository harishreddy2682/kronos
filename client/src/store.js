import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer, userActivateReducer } from './reducers/userReducer'
import { todoListsReducer, todoCreateReducer, todoDeleteReducer, getTasksReducer, addTaskReducer, deleteTaskReducer } from './reducers/todoReducer'

const reducers = combineReducers({
    userLogin: userLoginReducer,
    register: userRegisterReducer,
    activate: userActivateReducer,
    todoLists: todoListsReducer,
    createTodo: todoCreateReducer,
    deleteTodo: todoDeleteReducer,
    getTasks: getTasksReducer,
    addTask: addTaskReducer,
    deleteTask: deleteTaskReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store