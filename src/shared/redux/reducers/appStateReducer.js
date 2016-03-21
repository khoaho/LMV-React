import { UPDATE_USER } from '../constants/ActionTypes'

const initialState = {
  user: {
    name:'',
    login:'',
    isAdmin: false
  }
}

export default function(state = initialState, action) {

  switch (action.type) {

    case UPDATE_USER:

      return {
        user: action.user
      }

    default:
      return state;
  }
}