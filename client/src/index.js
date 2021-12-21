import rootReducer from './reducers'
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import App from './App';
import './index.css';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
require('dotenv').config()

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)