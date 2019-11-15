import { LOADING } from './types'

export const Loading = (data) => dispatch => {
  dispatch({
    type: LOADING,
    payload: data
  })
}