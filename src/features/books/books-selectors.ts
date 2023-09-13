import { AppRootStateType } from 'common/utils/types';

export const selectBooks = (state: AppRootStateType) => state.books.foundBooks;
export const selectTotalBooks = (state: AppRootStateType) => state.books.totalBooks;
