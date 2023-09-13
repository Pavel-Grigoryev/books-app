import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { appReducer } from 'app/app-reducer';
import thunkMiddleware from 'redux-thunk';
import { booksReducer } from 'features/books/books-reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  books: booksReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
