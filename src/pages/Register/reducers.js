import {
  REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_FAILURE
} from './actionTypes'

const initialState = {
  status: '',
}

const register = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return {
        ...state,
        status: action.status,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        status: action.status,
        payload: action.payload,
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        status: action.status,
        payload: action.payload,
      }
    default:
      return state
  }
}

export { register as registerReducer }
