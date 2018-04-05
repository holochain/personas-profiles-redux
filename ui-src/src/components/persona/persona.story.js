import React from 'react'
import {Provider} from 'react-redux';
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PersonaForm from './persona'
import expect from 'expect'
import newPersonaNotes from './newPersona.md'
import editPersonaNotes from './threePersonas.md'
configure({adapter: new Adapter()})

import CreateStore from '../../store'

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

storiesOf('Persona', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('New Persona', withNotes(newPersonaNotes) (() => {
    return getPersona(newPersona)
  }))
  .add('Edit Existing Persona', withNotes(editPersonaNotes) (() => {
    return getPersona(persona)
  }))

function getPersona(persona) {
  return (<Provider store={store}><PersonaForm savePersona={action('Sent the Persona')} persona={persona} /></Provider>)
}
