import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { specs } from 'storybook-addon-specifications'
import { withNotes } from '@storybook/addon-notes'
import LoginForm from './login'
import keygenNotes from './keygen.md'
// import { ersonaTests } from './persona.test'
import CreateStore from '../../../../store'

let store = CreateStore()

storiesOf('KeyGen', module)
  .addDecorator(story => (
    <Provider store={store}><MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter></Provider>
  ))
  .add('Holo', withNotes(keygenNotes)(() => {
    // specs(() => personaTests)
    return <LoginForm login={action('Click Create Persona')}/>

  })
)
