import React from 'react'
import {Provider} from 'react-redux';
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProfileForm from './profile'
import expect from 'expect'
import noPersonas from './noPersonas.md'
import threePersonas from './threePersonas.md'
configure({adapter: new Adapter()})

import CreateStore from '../../store'

let store = CreateStore()
let profileSpec1 = {
  "id": "HoloSoul",
  "sourceDna": "QmZ4CP5unaghnmxbJkSBwobehgcF5VdcKLPimXEkwVTUYh",
  "type": "object",
  "expiry": "2018-12-12T01:01:10+00:00",
  "requiredFields": ["firstname", "address", "suburb"],
  "profile": [
    {
      "appLabel": "firstname",
      "display": "First Name",
      "required": true,
      "type": "string",
      "usage": [
        {
          "type": "display",
          "reason": "So we can show your name when people click your handle"
        },
        {
          "type": "store",
          "reason": "So we can keep a record of who we sent the order to"
        }
      ]
    },
    {
      "appLabel": "address",
      "display": "Address",
      "required": true,
      "type": "string",
      "usage": [
        {
          "type": "store",
          "reason": "So we can keep records of where we sent your order"
        }
      ]
    },
    {
      "appLabel": "suburb",
      "display": "Suburb",
      "required": true,
      "type": "string",
      "usage": [
        {
          "type": "store",
          "reason": "So we can keep records of where we sent your order"
        }
      ]
    },
    {
      "appLabel": "city",
      "display": "City",
      "required": true,
      "type": "string",
      "usage": [
        {
          "type": "display",
          "reason": "So we can suggest people to meet in your city"
        }
      ]
    }
  ]
}

let profileSpec2 = {
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
}

let personas = [
    {
        "name": "Personal",
        "personaFields": [
            {"firstName": "Phil"},
            {"lastName": "Beadle"},
            {"address": "123 Holochain Road"},
            {"suburb": "Burwood"},
            {"city": "Melbourne"}
        ]
    },
    {
        "name": "Work",
        "personaFields": [
            {"firstName": "Philip"},
            {"lastName": "Beadle"},
            {"role": "Chief Engineer"},
            {"location": "Melbourne"}
        ]
    },
    {
        "name": "Friends",
        "personaFields": [
            {"nickName": "@philt3r"},
            {"hobby": "DJ"}
        ]
    }
]

let profileMapping = {
  'id': 'HoloSoul',
  'sourcedna': 'QmZ4CP5unaghnmxbJkSBwobehgcF5VdcKLPimXEkwVTUYh',
  'type': 'object',
  'expiry': '2018-12-12T01:01:10+00:00',
  'profile':
    {
      'firstname': 'Work.firstname',
      'address': 'Work.address',
      'suburb': 'Work.suburb',
      'city': 'Work.city'
    }
}

storiesOf('Profile', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('New Profile no Existing Personas', withNotes(noPersonas) (() => {
    let noExistingPersonas = []
    return getProfile(profileSpec2, noExistingPersonas)
  }))
  .add('New Profile with Existing Personas', withNotes(threePersonas) (() => {
    return getProfile(profileSpec1, personas)
  }))

function getProfile(profileSpec, personas) {
  return (<Provider store={store}><ProfileForm createProfileMapping={action('Sent the Profile Map')} createPersona={action('Sent the Persona')} profileSpec={profileSpec} personas={personas} /></Provider>)
}
