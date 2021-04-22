import { SET_USERS, GO_TO_HOME } from '../utils/constant'

const initialState = {
  users: [],
  goToHome: false
}

const contactReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      const data = action.payload.reduce((r, e) => {
        const title = e.name[0]
        if (!r[title]) r[title] = { title, data: [e] }
        else r[title].data.push(e)
        return r
      }, {})

      const result = Object.values(data)

      return {
        ...state,
        users: result
      }
    }
    case GO_TO_HOME: {
      return {
        ...state,
        goToHome: true
      }
    }
    default:
      return state
  }
}

export default contactReducers
