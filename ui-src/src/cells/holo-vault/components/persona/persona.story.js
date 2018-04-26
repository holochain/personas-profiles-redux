import React from 'react'
import {Provider} from 'react-redux';
import {storiesOf} from '@storybook/react'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PersonaForm from './persona'
import expect from 'expect'
import newPersonaNotes from './newPersona.md'
import editPersonaNotes from './threePersonas.md'
configure({adapter: new Adapter()})

import CreateStore from '../../../../store'

let store = CreateStore()
let newPersona = {
    "name": "New Persona",
    "personaFields": [
    ]
}
let persona =
    {
        "name": "Personal",
        "personaFields": [
            {"firstName": "Phil"},
            {"lastName": "Beadle"},
            {"address": "123 Holochain Road"},
            {"suburb": "Burwood"},
            {"city": "Melbourne"}
        ]
    }
let clickPersona = {}
const personaCreate = decorateAction([
  args => {
    clickPersona = args[0]
    // console.log(clickPersona)
    return args
  }
])

storiesOf('Persona', module)
  // .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('New Persona', withNotes(newPersonaNotes) (() => {
    specs(() => describe('New Persona', function () {
      it('Creating a Persona by adding new fields and values, this will send a Persona to Holochain', () => {
        const wrapper = mount(getPersona(newPersona))
        const testPersona = {
          "name":"Personal",
          "personaFields":[
            {"firstName":"Phil"},
            {"lastName":"Beadle"}
          ]
        }

        wrapper.find('input[name="personaName"]').simulate('change', {target: {value: 'Personal'}})
        wrapper.find('button[name="addField"]').simulate('click')
        wrapper.find('input[name="fieldName0"]').simulate('change', {target: {value: 'firstName'}})
        wrapper.find('input[name="fieldValue0"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('button[name="addField"]').simulate('click')
        wrapper.find('input[name="fieldName1"]').simulate('change', {target: {value: 'lastName'}})
        wrapper.find('input[name="fieldValue1"]').simulate('change', {target: {value: 'Beadle'}})
        wrapper.find('button[name="createPersona"]').simulate('click')
        wrapper.update()
        expect(clickPersona).toEqual(testPersona)
      })
    }))
    return getPersona(newPersona)
  }))
  .add('Edit Existing Persona', withNotes(editPersonaNotes) (() => {
    return getPersona(persona)
  })
)

function getPersona(persona) {
  return (<Provider store={store}><PersonaForm personaCreate={personaCreate('Click Create Persona')} persona={persona} /></Provider>)
}
