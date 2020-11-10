import { applyMiddleware, combineReducers, createStore, Store, compose } from 'redux'
import thunk from 'redux-thunk'

import {
    quizReducer,
    IQuizState
} from "../reducers/quizReducer"

export interface IAppState {
    quizState: IQuizState,
}

const rootReducer = combineReducers<IAppState>({
    quizState: quizReducer
})
const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

export default function configureStore(): Store<IAppState, any> {
    const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)))
    return store
}
