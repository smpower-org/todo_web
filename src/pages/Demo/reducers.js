import {
  FETCH_USERS_LOADING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from './actionTypes'

const initialState = {
  users: {
    status: ''
  }
}

const users = (state = initialState.users, action) => {
  switch (action.type) {
    case FETCH_USERS_LOADING:
      return {
        ...state,
        status: action.status,
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        status: action.status,
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        payload: action.payload,
        status: action.status,
      }
    default:
      return state
  }
}

export { users as usersReducer }
