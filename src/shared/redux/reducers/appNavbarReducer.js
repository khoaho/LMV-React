import { UPDATE_USER } from '../constants/ActionTypes'

const initialState = {
  username: ''
}

export default function(state = initialState, action) {

  switch (action.type) {

    case UPDATE_USER:

      return {
        username: action.username
      }

    default:
      return state;
  }
}