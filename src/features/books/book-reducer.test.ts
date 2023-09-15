import { bookActions, bookReducer, InitialStateType } from 'features/books/book-reducer';
import { BookType } from 'api/books-api';

describe('bookReducer', () => {
  let startState: InitialStateType;

  beforeEach(() => {
    startState = {
      currentBook: null,
    };
  });

  it('app should be installed the new book', () => {
    const newBook: BookType = {
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
    };
    const endState = bookReducer(startState, bookActions.setBookAC(newBook));

    expect(endState.currentBook).toEqual(newBook);
  });

  it('app should be clear the book data', () => {
    const startStateWithBook: InitialStateType = {
      currentBook: {
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
    };
    const endState = bookReducer(startStateWithBook, bookActions.clearBookDataAC());

    expect(endState.currentBook).toBeNull();
  });
});
