
export const stickiesListReducer = (state = { stickies: [] }, action) => {
    switch (action.type) {
        case 'GET_STICKIES_REQUEST':
            return { loading: true, ...state }
        case 'GET_STICKIES_SUCCESS':
            return { loading: false, stickies: action.payload }
        case 'GET_STICKIES_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteStickyReducer = (state = {  }, action) => {
    switch (action.type) {
        case 'DELETE_STICKY_REQUEST':
            return { loading: true, ...state }
        case 'DELETE_STICKY_SUCCESS':
            return { loading: false, success: action.payload }
        case 'DELETE_STICKY_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createStickyReducer = (state = {  }, action) => {
    switch (action.type) {
        case 'CREATE_STICKY_REQUEST':
            return { loading: true, ...state }
        case 'CREATE_STICKY_SUCCESS':
            return { loading: false, success: action.payload }
        case 'CREATE_STICKY_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getStickyReducer = (state = {  }, action) => {
    switch (action.type) {
        case 'GET_STICKY_REQUEST':
            return { loading: true, ...state }
        case 'GET_STICKY_SUCCESS':
            return { loading: false, sticky: action.payload }
        case 'GET_STICKY_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateStickyReducer = (state = {  }, action) => {
    switch (action.type) {
        case 'UPDATE_STICKY_REQUEST':
            return { loading: true, ...state }
        case 'UPDATE_STICKY_SUCCESS':
            return { loading: false, success: action.payload }
        case 'UPDATE_STICKY_FAIL':
            return { loading: false, error: action.payload }
        case 'UPDATE_STICKY_RESET':
            return {}
        default:
            return state
    }
}