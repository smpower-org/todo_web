import { 
  GETDATA_STARTED,
  GETDATA_SUCCESS,
  GETDATA_FAILURE,
  UPDATE_DATA_CHECKED_STATUS
} from './actionTypes';
import { baseUrl, apis } from '../config/';

export const getDataStarted = () => ({
  type: GETDATA_STARTED
});

export const getDataSuccess = (resJson) => ({
  type: GETDATA_SUCCESS,
  resJson
});

export const getDataFailure = (error) => ({
  type: GETDATA_FAILURE,
  error
});

export const getData = (uid, token) => {
  return dispatch => {
    getDataStarted();

    fetch(`${baseUrl}${apis.getData.path}`, {
      method: 'POST',
      type: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
	'Authorization': token
      },
      body: JSON.stringify({uid})
    }).then(res => {
      if (res.status === 200) return res.json();
      else dispatch(getDataFailure());
    }).then(resJson => {
      dispatch(getDataSuccess(resJson));
    }).catch(error => {
      dispatch(getDataFailure(error));
    });
  };
};

export const updateCheckedStatus = (index) => ({
  type: UPDATE_DATA_CHECKED_STATUS,
  index
});

