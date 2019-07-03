import {
  INCREMENT,
  INCREMENT_IF_ODD,
  DECREMENT,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from './actionTypes'

const initialState = {
  counter: 0,
  users: {},
}

const counter = (state = initialState.counter, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case INCREMENT_IF_ODD:
      return (state % 2 !== 0) ? state + 1 : state
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

const users = (state = initialState.users, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case GET_USERS_FAILURE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export { counter as counterReducer, users as usersReducer }
