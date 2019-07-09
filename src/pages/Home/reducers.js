import {
  TOGGLE_SIDER, TOGGLE_USERBOX,
} from './actionTypes'

const initialState = {
  sider: {
    isSiderExtended: true,
    isUserboxExtended: false,
  },
}

const sider = (state = initialState.sider, action) => {
  switch (action.type) {
    case TOGGLE_SIDER:
      return {
        ...state,
        isSiderExtended: action.isSiderExtended,
      }
    case TOGGLE_USERBOX:
      return {
        ...state,
        isUserboxExtended: action.isUserboxExtended,
      }
    default:
      return state
  }
}

export { sider as siderReducer }
