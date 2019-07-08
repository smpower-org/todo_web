import {
  TOGGLE_SIDER,
} from './actionTypes'

const initialState = {
  sider: {
    isSiderExtended: true,
  },
}

const sider = (state = initialState.sider, action) => {
  switch (action.type) {
    case TOGGLE_SIDER:
      return {
        ...state,
        isSiderExtended: action.payload.isSiderExtended
      }
    default:
      return state
  }
}

export { sider as siderReducer }
