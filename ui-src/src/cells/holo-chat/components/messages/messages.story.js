import React from 'react'
import {Provider} from 'react-redux'
import {storiesOf} from '@storybook/react'
import { MemoryRouter } from 'react-router'
import {action, decorateAction} from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import {specs, describe, it} from 'storybook-addon-specifications'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Messages from './messages'
import expect from 'expect'
configure({adapter: new Adapter()})

import CreateStore from '../../../../store'

let store = CreateStore()


storiesOf('HoloChat/Messages', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  // .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('List of Messages', () => (
    <Provider store={store}><Messages /></Provider>
  ))

function getMessages() {
  return (<Provider store={store}><Messages /></Provider>)
}
