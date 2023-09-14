import { AppRootStateType } from 'common/utils/types';

export const selectBooks = (state: AppRootStateType) => state.books.foundBooks;
export const selectTotalBooks = (state: AppRootStateType) => state.books.totalBooks;
export const selectSearchParams = (state: AppRootStateType) => state.books.searchParams;
export const selectSortingSelectNames = (state: AppRootStateType) => state.books.sortingSelectNames;
export const selectSubjectSelectNames = (state: AppRootStateType) => state.books.subjectSelectNames;
export const selectStartIndex = (state: AppRootStateType) => state.books.searchParams.startIndex;
