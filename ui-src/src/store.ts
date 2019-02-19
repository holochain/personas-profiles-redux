import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { holochainMiddleware } from '@holochain/hc-redux-middleware'
import { connect } from '@holochain/hc-web-client'
import holoVault from './hApps/holo-vault/reducer'
let rootReducer = combineReducers({ holoVault: holoVault })

const url = process.env.NODE_ENV === 'development' ? `ws://localhost:3400` : undefined
const middleware: Array<any> = [holochainMiddleware(connect(url))]

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
