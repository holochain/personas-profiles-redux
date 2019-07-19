import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { holochainMiddleware } from '@holochain/hc-redux-middleware'
import { connect } from '@holochain/hc-web-client'
import holoVault from './hApps/holo-vault/reducer'
let rootReducer = combineReducers({ holoVault: holoVault })

const REACT_APP_CHAT_WEBSOCKET_INTERFACE = process.env.REACT_APP_CHAT_WEBSOCKET_INTERFACE

let middleware: Array<any>
if (REACT_APP_CHAT_WEBSOCKET_INTERFACE) {
  middleware = [holochainMiddleware(connect(REACT_APP_CHAT_WEBSOCKET_INTERFACE))]
} else {
  middleware = [holochainMiddleware(connect())]
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function CreateStore () {
  return createStore(
  	rootReducer,
  	composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
}

export default CreateStore
