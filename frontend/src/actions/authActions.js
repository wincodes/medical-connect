import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER, LOADING } from './types'

export const registerUser = (userData, history) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  })
  axios.post('/api/users/register', userData)
    .then(res => {
      dispatch({
        type: LOADING,
        payload: false
      })
      history.push('/login')
    }
    )
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
  dispatch({
    type: LOADING,
    payload: false
  })
}

export const loginUser = userData => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  })
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

      dispatch({
        type: LOADING,
        payload: false
      })

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      dispatch({
        type: LOADING,
        payload: false
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
}
