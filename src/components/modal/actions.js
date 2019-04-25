import {
  SET_MODAL_VISIBLE,
  SET_MODAL_HIDE
} from './actionTypes';

export const visible = (params) => ({
  type: SET_MODAL_VISIBLE,
  isModalVisible: true,
  params
});

export const hide = (params) => ({
  type: SET_MODAL_HIDE,
  isModalVisible: false,
  params
});

