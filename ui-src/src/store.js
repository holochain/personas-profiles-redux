import { compact } from 'lodash'
import { applyMiddleware, compose, createStore } from 'redux'
import promiseMiddleware from 'redux-promise'
import { requestSendingMiddleware, hcMiddleware } from 'hc-redux-middleware'
import holoVault from './reducer'

const middleware = compact([
    hcMiddleware,
    requestSendingMiddleware,
    promiseMiddleware
])

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
function CreateStore() {
  return createStore(holoVault, undefined, composeEnhancers(applyMiddleware(...middleware)))
}

export default CreateStore;
