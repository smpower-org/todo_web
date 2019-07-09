import {
  TOGGLE_SIDER_VISIBLE, TOGGLE_USERBOX_VISIBLE,
} from './actionTypes'

const initialState = {
  userBox: {
    isUserboxExtended: false,
  },
  sider: {
    isSiderExtended: true,
    isUserboxExtended: false,
  },
}

const userBox = (state = initialState.userBox, action) => {
  switch (action.type) {
    case TOGGLE_USERBOX_VISIBLE:
      return {
        ...state,
        isUserboxExtended: action.isUserboxExtended,
      }
    default:
      return state
  }
}

const sider = (state = initialState.sider, action) => {
  switch (action.type) {
    case TOGGLE_SIDER_VISIBLE:
      return {
        ...state,
        isSiderExtended: action.isSiderExtended,
      }
    default:
      return state
  }
}

export { userBox as userBoxReducer, sider as siderReducer }
