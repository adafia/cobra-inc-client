import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
import {
  SET_SCREAMS,
  LOADING_DATA,
  LOADING_UI,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_SCREAM
} from '../types';

export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`${baseUrl}/screams`)
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch(err => {
			console.log(err)
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

export const postScream = (newScream) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${baseUrl}/scream`, newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS })
    })
    .catch(err => {
			console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};



export const likeScream = screamId => dispatch => {
  axios
    .get(`${baseUrl}/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const unlikeScream = screamId => dispatch => {
  axios
    .get(`${baseUrl}/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteScream = screamId => dispatch => {
  axios
    .delete(`${baseUrl}/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      });
    })
    .catch(err => console.log(err));
};
