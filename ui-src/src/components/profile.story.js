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
  "expires": "20181212",
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

storiesOf('Profile', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('New Profile no personas', withNotes(noPersonas) (() => {
    specs(() => describe('New Profile no personas', function () {
      it('Enter the name of your new Persona in the text box called "Persona"', () => {
        const wrapper = mount(<Provider store={store}><ProfileForm register={action('Clicked the Register button')} profileSpec={profileSpec}/></Provider>)
        wrapper.find('input[name="personaName"]').simulate('change', {target: {value: 'Work'}})
      })
      it('Fill out the rest of the fields with your Profile information and click "Create Profile"', () => {
        const wrapper = mount(<Provider store={store}><ProfileForm register={action('Clicked the Register button')} profileSpec={profileSpec}/></Provider>)
        wrapper.find('input[name="personaName"]').simulate('change', {target: {value: 'Work'}})
        wrapper.find('input[name="firstname"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('input[name="address"]').simulate('change', {target: {value: '123 Holochain Road'}})
        wrapper.find('input[name="suburb"]').simulate('change', {target: {value: 'Burwood'}})
        wrapper.find('input[name="city"]').simulate('change', {target: {value: 'Melbourne'}})
      })
    }))
    return getProfile()
  }))
  .add('New Profile with Personas', withNotes(threePersonas) (() => {
    specs(() => describe('New Profile with personas', function () {
      it('Select which Persona you want to use', () => {
        const wrapper = mount(<Provider store={store}><ProfileForm register={action('Clicked the Register button')} profileSpec={profileSpec}/></Provider>)
        expect(true)
      })
    }))
    return getProfile()
  }))

function getProfile() {
  return (<ProfileForm register={action('Clicked the Register button')} profileSpec={profileSpec} />)
}
