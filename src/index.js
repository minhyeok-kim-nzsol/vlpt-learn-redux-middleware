import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
//import myLogger from "./middlewares/myLogger";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
<<<<<<< HEAD
=======
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();
>>>>>>> Thunk완료

//const store = createStore(rootReducer, applyMiddleware(myLogger));
const store = createStore(
  rootReducer,
<<<<<<< HEAD
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
=======
composeWithDevTools(
  applyMiddleware(
    ReduxThunk.withExtraArgument({ history: customHistory }), 
    logger
  )
));

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
>>>>>>> Thunk완료
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
