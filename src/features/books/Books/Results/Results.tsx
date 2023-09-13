import React, { memo } from 'react';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { booksSelectors } from 'features/books/index';
import { BookItem } from 'features/books/Books/Results/BookItem';
import { BookType } from 'api/books-api';
import s from './Results.module.scss';

type PropsType = {
  totalBooks: number;
};
export const Results = memo(({ totalBooks }: PropsType) => {
  const books = useAppSelector(booksSelectors.selectBooks);
  const resultBooks = books?.map((book: BookType) => <BookItem key={book.id} book={book} />);
  const results = totalBooks === 1 ? 'result' : 'resutls';
  const totalResults = totalBooks ? `Found ${totalBooks} ${results}` : 'No books found';
  return (
    <section className={s.resultsSection}>
      <p className={s.totalResults}>{totalResults}</p>
      {totalBooks && <ul className={s.booksList}> {resultBooks}</ul>}
    </section>
  );
});
