import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { rootReducer } from 'app/store';
import { AppActionsType } from 'app/app-reducer';
import { BooksActionsType } from 'features/books/books-reducer';
import { BookActionsType } from 'features/books/book-reducer';

export type RootReducerType = typeof rootReducer;

export type AppRootStateType = ReturnType<RootReducerType>;

export type ActionTypes = AppActionsType | BooksActionsType | BookActionsType;

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  ActionTypes
>;
