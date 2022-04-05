import axios from "axios"

export const getLoggedUser = () => async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/')
      if (res.status === 200) {
        dispatch({
          type: 'USER_LOGIN_SUCCESS',
          payload: res.data
        })
      }
    } catch (error) {
      dispatch({ type: 'USER_LOGOUT' })
    }
}