export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { loading: true, ...state }
        case 'USER_LOGIN_SUCCESS':
            return { loading: false, userInfo: action.payload }
        case 'USER_LOGIN_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_LOGOUT':
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { loading: true, success: false, ...state }
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, activationToken: action.payload, success: true }
        case 'USER_REGISTER_FAIL':
            return { loading: false, error: action.payload, success: false }
        case 'USER_REGISTER_RESET_SUCCESS':
            return { ...state, success: false }
        default:
            return state
    }
}

export const userActivateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_ACTIVATE_REQUEST':
            return { loading: true, ...state }
        case 'USER_ACTIVATE_SUCCESS':
            return { loading: false, success: action.payload }
        case 'USER_ACTIVATE_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}