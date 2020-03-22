import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './components/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';


const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
); 

store.subscribe(() => console.log('state updated...',store.getState()));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
);