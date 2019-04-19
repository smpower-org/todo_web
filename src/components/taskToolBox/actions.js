import {
  SET_TASKTOOLBOX_VISIBLE,
  SET_TASKTOOLBOX_HIDDEN
} from './actionTypes';

export const visible = (style) => ({
  type: SET_TASKTOOLBOX_VISIBLE,
  style
});

export const hidden = () => ({
  type: SET_TASKTOOLBOX_HIDDEN
});

