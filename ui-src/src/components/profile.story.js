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

import CreateStore from '../store'

let store = CreateStore()
let profileSpec = {
  "$id": "holochat/profileSpec.json",
  "source-dna": "QmZ4CP5unaghnmxbJkSBwobehgcF5VdcKLPimXEkwVTUYh",
  "type": "object",
  "expiry": "2018-12-12T01:01:10+00:00",
  "required": ["firstname", "address", "suburb"],
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
          "type": "store",
          "reason": "So we can keep records of where we sent your order"
        }
      ]
    }
  ]
}

let personas = [
    {
        "name": "Personal",
        "persona": [
            {"firstName": "Phil"},
            {"lastName": "Beadle"},
            {"address": "123 Holochain Road"},
            {"suburb": "Burwood"},
            {"city": "Melbourne"}
        ]
    },
    {
        "name": "Work",
        "persona": [
            {"firstName": "Philip"},
            {"lastName": "Beadle"},
            {"role": "Chief Engineer"},
            {"location": "Melbourne"}
        ]
    },
    {
        "name": "Friends",
        "persona": [
            {"nickName": "@philt3r"},
            {"hobby": "DJ"}
        ]
    }
]


let suggestions = [
  { 'persona': 'Work', 'field': 'firstName', 'label': 'Philip' },
  { 'persona': 'Work', 'field': 'lastName', 'label': 'Beadle' },
  { 'persona': 'Work', 'field': 'role', 'label': 'Chief Engineer' },
  { 'persona': 'Work', 'field': 'location', 'label': 'Melbourne' },
  { 'persona': 'Personal', 'field': 'firstName', 'label': 'Phil' },
  { 'persona': 'Personal', 'field': 'lastName', 'label': 'Beadle' },
  { 'persona': 'Personal', 'field': 'address', 'label': '123 Holochain Road' },
  { 'persona': 'Personal', 'field': 'suburb', 'label': 'Burwood' },
  { 'persona': 'Personal', 'field': 'city', 'label': 'Melbourne' }
]

storiesOf('Profile', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('New Profile no Existing Identities', withNotes(noPersonas) (() => {
    specs(() => describe('New Profile no Existing Identities', function () {
      it('Enter the name of your new Persona in the text box called "Persona"', () => {
        const wrapper = mount(getProfile(profileSpec, personas, suggestions))
        wrapper.find('input[name="personaName"]').simulate('change', {target: {value: 'Work'}})
      })
      it('Fill out the rest of the fields with your Profile information and click "Create Profile"', () => {
        const wrapper = mount(getProfile(profileSpec, personas, suggestions))
        wrapper.find('input[name="personaName"]').simulate('change', {target: {value: 'Work'}})
        wrapper.find('input[name="firstname"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('input[name="address"]').simulate('change', {target: {value: '123 Holochain Road'}})
        wrapper.find('input[name="suburb"]').simulate('change', {target: {value: 'Burwood'}})
        wrapper.find('input[name="city"]').simulate('change', {target: {value: 'Melbourne'}})
      })
    }))
    return getProfile(profileSpec, suggestions)
  }))
  .add('New Profile with Existing Identities', withNotes(threePersonas) (() => {
    specs(() => describe('New Profile with Existing Identities', function () {
      it('Select which Persona you want to use', () => {
        const wrapper = mount(getProfile(profileSpec, personas, suggestions))
        wrapper.find('input[name="personaName"]').at(0 ).simulate('click')
      })
    }))
    return getProfile(profileSpec, personas, suggestions)
  }))

function getProfile(profileSpec, personas, suggestions) {
  return (<Provider store={store}><ProfileForm register={action('Clicked the Register button')} profileSpec={profileSpec} personas={personas} suggestions={suggestions} /></Provider>)
}
