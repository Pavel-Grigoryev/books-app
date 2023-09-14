import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { appReducer } from 'app/app-reducer';
import thunkMiddleware from 'redux-thunk';
import { bookReducer, booksReducer } from 'features/books';

export const rootReducer = combineReducers({
  app: appReducer,
  books: booksReducer,
  book: bookReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
