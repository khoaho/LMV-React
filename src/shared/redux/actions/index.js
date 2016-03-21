import * as ActionTypes from 'constants/ActionTypes'

export function updateUser(user){

  return {
    type: ActionTypes.UPDATE_USER,
    user: user
  }
}