import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as A from './actions'

const initialState = {
  userHash: 'empty',
  profileSpec: {
    "id": "AwesomeApp",
    "sourceDna": "QmZ4CP5unaghnmxbJkSBwobehgcF5VdcKLPimXEkwVTUYh",
    "type": "object",
    "expiry": "2018-12-12T01:01:10+00:00",
    "requiredFields": ["userName"],
    "profile": [
      {
        "appLabel": "userName",
        "display": "User Name",
        "required": true,
        "type": "string",
        "usage": [
          {
            "type": "display",
            "reason": "So we can show your userName"
          }
        ]
      },
      {
        "appLabel": "dogsname",
        "display": "Dogs Name",
        "required": true,
        "type": "string",
        "usage": [
          {
            "type": "display",
            "reason": "So others can see your dogs name."
          }
        ]
      }
    ]
  },
  "personas":[],
  "persona": {
      "name": "New Persona",
      "personaFields": [
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
    default:
      return state
  }
}

export default combineReducers({
  profile: vaultReducer,
  form: formReducer
})
