import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { clearCurrentprofile } from './profileActions'

import { GET_ERRORS, SET_CURRENT_USER } from './types'

export const registerUser = (userData, history) => dispatch => {
  
  axios.post('/api/users/register', userData)
    .then(res => {
      history.push('/login')
    }
    )
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const loginUser = userData => dispatch => {
  
  axios.post('/api/users/login ', userData)
    .then(res => {
      const { token } = res.data
      //save the token in local storage
      localStorage.setItem('jwtToken', token)

      //set the axios authorization token
      setAuthToken(token)

      //decode the jwt token
      const decoded = jwt_decode(token)

      //set current user
      dispatch(setCurrentUser(decoded))

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//log out user action
export const logoutUser = () => dispatch => {
  //remove the toke from localstorage
  localStorage.removeItem('jwtToken');

  //remove auth header
  setAuthToken(false)

  //set current user to empty object
  dispatch(setCurrentUser({}));
  dispatch(clearCurrentprofile());
}
