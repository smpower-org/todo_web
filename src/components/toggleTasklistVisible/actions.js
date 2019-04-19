import {
  TOGGLE_TASKLIST_VISIBLE
} from './actionTypes';

export const toggleTasklistVisible = (isTasklistVisible) => ({
  type: TOGGLE_TASKLIST_VISIBLE,
  isTasklistVisible
});

