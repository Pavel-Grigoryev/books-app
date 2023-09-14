import { setAppStatusAC } from 'app/app-reducer';
import { AppThunk } from 'common/utils/types';
import { booksApi } from 'api/api';
import { BookType, ParamsType } from 'api/books-api';
import { MAX_RESULTS } from 'common/constants/searchParams';

const initialState = {
  totalBooks: null as null | number,
  foundBooks: null as null | BookType[],
  searchParams: {
    q: '',
    startIndex: 0,
    maxResults: MAX_RESULTS,
    orderBy: 'relevance',
    subject: 'all',
  } as SearchParamsType,
  sortingSelectNames: [
    { id: 1, name: 'relevance' },
    { id: 2, name: 'newest' },
  ] as SortingSelectNamesType[],
  subjectSelectNames: [
    { id: 1, name: 'all' },
    { id: 2, name: 'art' },
    { id: 3, name: 'biography' },
    { id: 4, name: 'computers' },
    { id: 5, name: 'history' },
    { id: 6, name: 'medical' },
    { id: 7, name: 'poetry' },
  ] as SortingSubjectNamesType[],
};
export const booksReducer = (
  state: InitialStateType = initialState,
  action: BooksActionsType
): InitialStateType => {
  switch (action.type) {
    case 'BOOKS/SET-BOOKS':
      return { ...state, totalBooks: action.totalBooks, foundBooks: action.books };
    case 'BOOKS/SET-SEARCH-PARAMS':
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          q: action.searchParams.q,
          orderBy: action.searchParams.orderBy,
          subject: action.searchParams.subject,
          startIndex: 0,
          maxResults: MAX_RESULTS,
        },
      };
    case 'BOOKS/SET-START-INDEX': {
      const initialStep = state.searchParams.startIndex === 0 ? 1 : 0;
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          startIndex: state.searchParams.startIndex + MAX_RESULTS + initialStep,
        },
      };
    }
    case 'BOOKS/SET-MORE-BOOKS': {
      const booksArray = state.foundBooks !== null ? [...state.foundBooks, ...action.books] : null;
      return { ...state, foundBooks: booksArray };
    }

    default:
      return state;
  }
};

// Actions
export const setBooksAC = (totalBooks: number, books: null | BookType[]) =>
  ({
    type: 'BOOKS/SET-BOOKS',
    totalBooks,
    books,
  }) as const;

export const setMoreBooksAC = (books: BookType[]) =>
  ({
    type: 'BOOKS/SET-MORE-BOOKS',
    books,
  }) as const;

export const setStartIndexAC = () =>
  ({
    type: 'BOOKS/SET-START-INDEX',
  }) as const;

export const setSearchParamsAC = (
  searchParams: Omit<SearchParamsType, 'startIndex' | 'maxResults'>
) =>
  ({
    type: 'BOOKS/SET-SEARCH-PARAMS',
    searchParams,
  }) as const;

// Thunks

export const setBooksTC = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const { searchParams } = getState().books;
    const { subject, ...restSearchParams } = searchParams;
    const querySubject = subject === 'all' ? '' : ` subject:${subject}`;
    const query = searchParams.q ? `${searchParams.q}${querySubject}` : '';
    const params: ParamsType = {
      ...restSearchParams,
      q: query,
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
    if (searchParams.startIndex > MAX_RESULTS) {
      if (books) {
        dispatch(setMoreBooksAC(books));
      }
    } else {
      dispatch(setBooksAC(res.data.totalItems, books));
    }
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    console.error(e);
  }
};

export const booksActions = {
  setBooksTC,
  setBooksAC,
  setSearchParamsAC,
  setStartIndexAC,
  setMoreBooksAC,
};

// Types

type InitialStateType = typeof initialState;
type SetBooksAT = ReturnType<typeof setBooksAC>;
type SetSearchParamsAT = ReturnType<typeof setSearchParamsAC>;
type SetStartIndexAT = ReturnType<typeof setStartIndexAC>;
type SetMoreBooksAT = ReturnType<typeof setMoreBooksAC>;
export type BooksActionsType = SetBooksAT | SetSearchParamsAT | SetStartIndexAT | SetMoreBooksAT;
export type OrderByType = 'relevance' | 'newest';
export type CategoriesType =
  | 'all'
  | 'art'
  | 'biography'
  | 'computers'
  | 'history'
  | 'medical'
  | 'poetry';
export type SearchParamsType = {
  q: string;
  startIndex: number;
  maxResults: number;
  subject: CategoriesType;
  orderBy: OrderByType;
};
type SortingSelectNamesType = {
  id: number;
  name: OrderByType;
};
type SortingSubjectNamesType = {
  id: number;
  name: CategoriesType;
};
