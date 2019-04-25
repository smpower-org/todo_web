import {
  SET_MODAL_VISIBLE,
  SET_MODAL_HIDE
} from './actionTypes';

export default (state = {isModalVisible: false, params: {}}, action) => {
  switch(action.type) {
    case SET_MODAL_VISIBLE:
      return {
        ...state,
	isModalVisible: action.isModalVisible,
	params: action.params
      };
    case SET_MODAL_HIDE:
      return {
        ...state,
	isModalVisible: action.isModalVisible,
	params: action.params
      };
    default:
      return state;
  }
};
