import React from 'react'
import { Provider } from 'react-redux'
import Persona from './containers/personaContainer'

const Root = ({ store }) => (
  <Provider store={store}>
    <Persona />
  </Provider>
)

export default Root
