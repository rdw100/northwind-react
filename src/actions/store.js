import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

// Thunk middleware returns a function 
// result instead of an object.
export const store = createStore (
    reducers,
    compose(
        applyMiddleware(thunk)//,
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)