import { setAppStatusAC } from 'app/app-reducer';
import { AppThunk } from 'common/utils/types';
import { booksApi } from 'api/api';
import { BookType, ParamsType } from 'api/books-api';

const initalState = {
  totalBooks: null as null | number,
  foundBooks: null as null | BookType[],
  searchParams: {
    q: 'o',
  } as SearchParamsType,
};
export const booksReducer = (
  state: InitalStateType = initalState,
  action: BooksActionsType
): InitalStateType => {
  switch (action.type) {
    case 'SET-BOOKS':
      return { ...state, totalBooks: action.totalBooks, foundBooks: action.books };
    default:
      return state;
  }
};

// Actions
export const setBooksAC = (totalBooks: number, books: null | BookType[]) =>
  ({
    type: 'SET-BOOKS',
    totalBooks,
    books,
  }) as const;

// Thunks

export const setBooksTC = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const { searchParams } = getState().books;
    const params: ParamsType = {
      ...searchParams,
      key: process.env.REACT_APP_API_KEY,
    };
    const res = await booksApi.getBooks(params);
    const books: BookType[] | null = res.data.items
      ? res.data.items.map((book) => ({
          id: book.id,
          volumeInfo: {
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            pageCount: book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories,
            imageLinks: book.volumeInfo.imageLinks,
            description: book.volumeInfo.description,
          },
        }))
      : null;

    dispatch(setBooksAC(res.data.totalItems, books));
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    console.error(e);
  }
};

export const booksActions = { setBooksTC, setBooksAC };

// Types

type InitalStateType = typeof initalState;
type SetBooksAT = ReturnType<typeof setBooksAC>;
export type BooksActionsType = SetBooksAT;
type SearchParamsType = {
  q: string;
};
