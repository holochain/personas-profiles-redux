import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import  * as constants from './constants.js'
import * as A from './actions'

const initialState = {
  title: 'Holochain',
  userHash: 'empty',
  profileSpec: constants.profile1.profileSpec,
  profiles: [constants.profile1, constants.profile2, constants.profile3, constants.profile4],
  profile: constants.profile1,
  profileMapping: constants.mapping,
  personas:constants.personas,
  persona: constants.personas[0]
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
    case A.PERSONASLIST:
        return {
          ...state,
          personas: payload
        }
    default:
      return state
  }
}

export default combineReducers({
  profile: vaultReducer,
  form: formReducer
})
