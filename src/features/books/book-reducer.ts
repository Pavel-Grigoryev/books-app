import { BookType, SingleBookParamsType } from 'api/books-api';
import { AppThunk } from 'common/utils/types';
import { appActions } from 'app';
import { booksApi } from 'api/api';
import axios from 'axios';
import { handleServerNetworkError } from 'common/utils/error-utils';

const initialState = {
  currentBook: null as null | BookType,
};

export const bookReducer = (
  state: InitialStateType = initialState,
  action: BookActionsType
): InitialStateType => {
  switch (action.type) {
    case 'BOOK/SET-BOOK':
      return { ...state, currentBook: action.book };
    case 'BOOK/CLEAR-DATA':
      return { ...state, currentBook: null };
    default:
      return state;
  }
};

// Actions
const setBookAC = (book: BookType) =>
  ({
    type: 'BOOK/SET-BOOK',
    book,
  }) as const;

const clearBookDataAC = () =>
  ({
    type: 'BOOK/CLEAR-DATA',
  }) as const;

// Thunks

const fetchBookTC =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'));
    dispatch(clearBookDataAC());
    try {
      const params: SingleBookParamsType = {
        key: process.env.REACT_APP_API_KEY,
      };

      const res = await booksApi.getSingleBook(id, params);
      const book: BookType = {
        id: res.data.id,
        volumeInfo: {
          title: res.data.volumeInfo.title,
          subtitle: res.data.volumeInfo.subtitle,
          authors: res.data.volumeInfo.authors,
          pageCount: res.data.volumeInfo.pageCount,
          categories: res.data.volumeInfo.categories,
          imageLinks: res.data.volumeInfo.imageLinks,
          description: res.data.volumeInfo.description,
        },
      };
      dispatch(setBookAC(book));
      dispatch(appActions.setAppStatusAC('succeeded'));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch);
      }
    }
  };
export const bookActions = { setBookAC, fetchBookTC, clearBookDataAC };

// Types

export type InitialStateType = typeof initialState;
type SetBookAT = ReturnType<typeof setBookAC>;
type ClearBookDataAT = ReturnType<typeof clearBookDataAC>;
export type BookActionsType = SetBookAT | ClearBookDataAT;
