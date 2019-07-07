import {
  LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILURE
} from './actionTypes'

const initialState = {
  auth: false
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        status: action.status,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: true,
        payload: action.payload,
        status: action.status,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        payload: action.payload,
        status: action.status,
      }
    default:
      return state
  }
}

export { login as loginReducer }
