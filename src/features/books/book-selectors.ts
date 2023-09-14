import { AppRootStateType } from 'common/utils/types';

export const selectBook = (state: AppRootStateType) => state.book.currentBook;
