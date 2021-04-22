import { GO_TO_HOME, SET_USERS } from '../utils/constant'

export const setUsers = payload => ({
  type: SET_USERS,
  payload
})

export const goToHome = () => ({
  type: GO_TO_HOME
})
