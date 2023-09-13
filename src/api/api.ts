import { BooksApi } from 'api/books-api';
import { instance } from 'api/instances';

export const booksApi = new BooksApi(instance);
