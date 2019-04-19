import {
  SET_TASKTOOLBOX_VISIBLE,
  SET_TASKTOOLBOX_HIDDEN
} from './actionTypes';

export default (state = {isTaskToolBoxVisible: false}, action) => {
  switch(action.type) {
    case SET_TASKTOOLBOX_VISIBLE:
      return {
        ...state,
	isTaskToolBoxVisible: true,
	style: action.style
      };
    case SET_TASKTOOLBOX_HIDDEN:
      return {
        ...state,
	isTaskToolBoxVisible: false
      };
    default:
      return state;
  }
}
