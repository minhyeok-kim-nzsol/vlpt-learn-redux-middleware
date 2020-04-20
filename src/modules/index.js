import { combineReducers } from "redux";
import counter from "./counter";
<<<<<<< HEAD

const rootReducer = combineReducers({ counter });
=======
import posts from './posts';

const rootReducer = combineReducers({ counter, posts });
>>>>>>> Thunk완료

export default rootReducer;
