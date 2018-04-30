import React from 'react'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router'
import {storiesOf} from '@storybook/react'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProfileForm from './profile'
import Profiles from './profiles'
import expect from 'expect'
import noPersonas from './noPersonas.md'
import threePersonas from './threePersonas.md'
import editProfile from './editProfile.md'
import  * as constants from '../../constants.js'

configure({adapter: new Adapter()})

import CreateStore from '../../../../store'

let store = CreateStore()
let profileMapping = {
  'id': 'HoloChat',
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

let clickPersona = {}
const personaCreate = decorateAction([
  args => {
    clickPersona = args[0]
    console.log(clickPersona)
    return args
  }
])

storiesOf('HoloVault/Profile', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('List of Profiles', withNotes(noPersonas) (() => {
    return getProfiles([constants.profile1, constants.profile2, constants.profile3, constants.profile4])
  }))
  .add('New Profile no Existing Personas', withNotes(noPersonas) (() => {
    let noExistingPersonas = []
    specs(() => describe('New Profile no Existing Personas', function () {
      it('Creating a Profile with valid entries sends a Persona and a PersonaMapping', () => {
        const wrapper = mount(getProfile(constants.profile4.profileSpec, noExistingPersonas, profileMapping))
        wrapper.find('input[name="timeZone"]').simulate('click')
        wrapper.find('input[name="timeZone"]').simulate('change', {target: {value: 'UTC+10'}})
        wrapper.find('input[name="avatar"]').simulate('change', {target: {value: 'base64'}})
        console.log(wrapper.find('ul').exists())
        wrapper.find('button[name="createProfile"]').simulate('click')
      })
    }))
    return getProfile(constants.profile4.profileSpec, noExistingPersonas, profileMapping)
  }))
  .add('New Profile with Existing Personas', withNotes(threePersonas) (() => {
    specs(() => describe('HoloVault/New Profile Existing Personas', function () {
      it('Creating a Profile by adding new entries sends a full Persona and a PersonaMapping', () => {
        const wrapper = mount(getProfile(constants.profile1.profileSpec, constants.personas))
        wrapper.find('input[name="firstName"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('input[name="lastName"]').simulate('change', {target: {value: 'Beadle'}})
        wrapper.find('input[name="handle"]').simulate('change', {target: {value: '@philt3r'}})
        wrapper.find('button[name="createProfile"]').simulate('click')
      })
    }))
    let profileMapping = {
      id: 'HoloChat',
      sourceDna: 'QmZ4CP5unaghnmxbJkSBwobehgcF5VdcKLPimXEkwVTUYh',
      type: 'object',
      expiry: '2018-12-12T01:01:10+00:00',
      profile: {}
    }
    return getProfile(constants.profile1.profileSpec, constants.personas, profileMapping)
  }))
  .add('Edit Profile', withNotes(editProfile) (() => {
    specs(() => describe('HoloVault/New Profile Existing Personas', function () {
      it('Creating a Profile by adding new entries sends a full Persona and a PersonaMapping', () => {
        const wrapper = mount(getProfile(constants.profile1.profileSpec, constants.personas))
        wrapper.find('input[name="firstName"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('input[name="lastName"]').simulate('change', {target: {value: 'Beadle'}})
        wrapper.find('input[name="handle"]').simulate('change', {target: {value: '@philt3r'}})
        wrapper.find('button[name="createProfile"]').simulate('click')
      })
    }))
    return getProfile(constants.profile1.profileSpec, constants.personas, constants.mapping)
  }))
function getProfiles(profiles) {
  return (<Provider store={store}><Profiles profiles={profiles} /></Provider>)
}

function getProfile(profileSpec, personas, mapping) {
  return (<Provider store={store}><ProfileForm profileMappingCreate={action('Sent the Profile Map')} personaCreate={personaCreate('Click Create Persona')} profileSpec={profileSpec} personas={personas} mapping={mapping} /></Provider>)
}
