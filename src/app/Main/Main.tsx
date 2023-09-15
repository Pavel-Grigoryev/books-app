import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PATH } from 'common/constants/routes';
import { Books } from 'features/books/Books';
import { Book } from 'features/books/Books/Results/Book';
import { ErrorSnackbar } from 'common/components/ErrorSnackbar';
import { NotFound } from 'app/pages/404';
import s from './Main.module.scss';

export const Main = () => {
  return (
    <main className={s.main}>
      {/* <img src={backGroundImage} alt="" className={s.backgroundImage} /> */}
      <ErrorSnackbar />
      <div className={s.container}>
        <Routes>
          <Route path={PATH.BOOKS_PAGE} element={<Books />} />
          <Route path={PATH.NOT_FOUND} element={<NotFound />} />
          <Route path={PATH.BOOK_PAGE} element={<Book />} />
          <Route path="*" element={<Navigate to={PATH.NOT_FOUND} />} />
        </Routes>
      </div>
    </main>
  );
};
