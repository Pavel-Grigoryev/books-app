import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PATH } from 'common/constants/routes';
import { Books } from 'features/books/Books';
import { NotFound } from '../pages/404';
import s from './Main.module.scss';

export const Main = () => {
  return (
    <main className={s.main}>
      <div className={s.container}>
        <Routes>
          <Route path={PATH.BOOKS} element={<Books />} />
          <Route path={PATH.NOT_FOUND} element={<NotFound />} />
          <Route path="*" element={<Navigate to={PATH.NOT_FOUND} />} />
        </Routes>
      </div>
    </main>
  );
};
