import { BookType } from 'api/books-api';
import { MAX_RESULTS } from 'common/constants/searchParams';
import {
  booksActions,
  booksReducer,
  InitialStateType,
  SearchParamsType,
} from 'features/books/books-reducer';

describe('booksReducer', () => {
  let startState: InitialStateType;

  beforeEach(() => {
    startState = {
      totalBooks: null,
      foundBooks: null,
      searchParams: {
        q: '',
        startIndex: 0,
        maxResults: MAX_RESULTS,
        orderBy: 'relevance',
        subject: 'all',
      },
      sortingSelectNames: [
        { id: 1, name: 'relevance' },
        { id: 2, name: 'newest' },
      ],
      subjectSelectNames: [
        { id: 1, name: 'all' },
        { id: 2, name: 'art' },
        { id: 3, name: 'biography' },
        { id: 4, name: 'computers' },
        { id: 5, name: 'history' },
        { id: 6, name: 'medical' },
        { id: 7, name: 'poetry' },
      ],
    };
  });

  it('app should be set books', () => {
    const totalItems = 500;
    const newBooks: BookType[] = [
      {
        id: 'LUIMjWtE9ZU',
        volumeInfo: {
          title: 'Lexington',
          subtitle: "The Extraordinary Life and Turbulent Times of America's Legendary Racehorse",
          authors: ['Kim Wickens'],
          pageCount: 416,
          categories: [
            'Sports & Recreation / Animal Sports / Horse Racing',
            'History / United States / Civil War Period (1850-1877)',
            'Biography & Autobiography / Sports',
          ],
          imageLinks: { smallThumbnail: 'url', thumbnail: 'url' },
          description: 'Sample description',
        },
      },
      {
        id: 'LUIMjWtdsdsE9ZU',
        volumeInfo: {
          title: 'Lexington2',
          subtitle: "The Extraordinary Life and Turbulent Times of America's Legendary Racehorse",
          authors: ['Kim'],
          pageCount: 200,
          categories: ['Biography & Autobiography'],
          imageLinks: { smallThumbnail: 'url', thumbnail: 'url' },
          description: 'Sample description',
        },
      },
    ];
    const endState = booksReducer(startState, booksActions.setBooksAC(totalItems, newBooks));

    expect(endState.totalBooks).toBe(500);
    expect(endState.foundBooks?.length).toBe(2);
    expect(endState.foundBooks?.[1]?.volumeInfo.title).toBe('Lexington2');
  });

  it('app should be set search params', () => {
    const searchParams: SearchParamsType = {
      q: 'query',
      orderBy: 'newest',
      subject: 'art',
    };

    const endState = booksReducer(startState, booksActions.setSearchParamsAC(searchParams));

    expect(endState.searchParams.q).toBe('query');
    expect(endState.searchParams.subject).toBe('art');
    expect(endState.searchParams.startIndex).toBe(0);
  });

  it('app should set start index', () => {
    const endState = booksReducer(startState, booksActions.setStartIndexAC());

    expect(endState.searchParams.startIndex).toBe(31);
  });

  it('app should set more books', () => {
    const state: InitialStateType = {
      ...startState,
      foundBooks: [
        {
          id: 'LUIMjWtE9ZU',
          volumeInfo: {
            title: 'Lexington',
            subtitle: 'How Britain Prepared for Nuclear War',
            authors: ['Kim Wickens'],
            pageCount: 416,
            categories: [
              'Sports & Recreation / Animal Sports / Horse Racing',
              'History / United States / Civil War Period (1850-1877)',
              'Biography & Autobiography / Sports',
            ],
            imageLinks: { smallThumbnail: 'url', thumbnail: 'url' },
            description: 'Sample description',
          },
        },
        {
          id: 'LUIMjWtdsdsE9ZU',
          volumeInfo: {
            title: 'Attack Warning Red!',
            subtitle: "The Extraordinary Life and Turbulent Times of America's Legendary Racehorse",
            authors: ['Julie McDowall'],
            pageCount: 252,
            categories: ['Biography'],
            imageLinks: { smallThumbnail: 'url', thumbnail: 'url' },
            description: 'Sample description',
          },
        },
      ],
    };
    const newBooks: BookType[] = [
      {
        id: 'LUIMjeWtdsdsEtj9ZU',
        volumeInfo: {
          title: 'Lexington2',
          subtitle: "The Extraordinary Life and Turbulent Times of America's Legendary Racehorse",
          authors: ['Kim'],
          pageCount: 200,
          categories: ['Biography & Autobiography'],
          imageLinks: { smallThumbnail: 'url', thumbnail: 'url' },
          description: 'Sample description',
        },
      },
    ];

    const endState = booksReducer(state, booksActions.setMoreBooksAC(newBooks));

    expect(endState.foundBooks?.length).toBe(3);
    expect(endState.foundBooks?.[2]?.volumeInfo.authors[0]).toBe('Kim');
  });
});
