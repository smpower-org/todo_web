import { 
  SET_USERBOX_VISIBLE,
  SET_USERBOX_HIDDEN
} from './actionTypes';

export const visible = () => ({
  type: SET_USERBOX_VISIBLE
});

export const hide = () => ({
  type: SET_USERBOX_HIDDEN
});

// export const toggleUserboxStatus = (isUserboxExtended) => ({
//   type: TOGGLE_USERBOX_STAUS,
//   isUserboxExtended
// });

