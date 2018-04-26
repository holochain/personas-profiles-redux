import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import  * as constants from './constants.js'
import * as A from './actions'

const initialState = {
  userHash: 'empty',
  profileSpec: constants.profile1.profileSpec,
  profiles: [constants.profile1, constants.profile2, constants.profile3, constants.profile4],
  personas:constants.personas,
  persona: {
      name: "New Persona",
      personaFields: [
      ]
  }
}

function vaultReducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case A.PROFILEMAPPINGCREATE:
        return {
          ...state,
          hash: payload
        }
    case A.PERSONACREATE:
        return {
          ...state,
          hash: payload
        }
    case A.PROFILESLIST:
        return {
          ...state,
          profiles: payload
        }
    default:
      return state
  }
}

export default combineReducers({
  profile: vaultReducer,
  form: formReducer
})
