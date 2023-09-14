import React, { memo } from 'react';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { booksActions, booksSelectors } from 'features/books/index';
import { BookItem } from 'features/books/Books/Results/BookItem';
import { BookType } from 'api/books-api';
import Button from '@mui/material/Button';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { MAX_RESULTS } from 'common/constants/searchParams';
import s from './Results.module.scss';

type PropsType = {
  totalBooks: number;
};
export const Results = memo(({ totalBooks }: PropsType) => {
  const books = useAppSelector(booksSelectors.selectBooks);
  const startIndex = useAppSelector(booksSelectors.selectStartIndex);
  const resultBooks = books?.map((book: BookType) => <BookItem key={book.id} book={book} />);
  const results = totalBooks === 1 ? 'result' : 'resutls';
  const totalResults = totalBooks ? `Found ${totalBooks} ${results}` : 'No books found';

  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(booksActions.setStartIndexAC());
  };

  return (
    <section className={s.resultsSection}>
      <p className={s.totalResults}>{totalResults}</p>
      {totalBooks && (
        <>
          <ul className={s.booksList}> {resultBooks}</ul>
          {totalBooks > MAX_RESULTS && startIndex + MAX_RESULTS < totalBooks && (
            <div className={s.buttonBlock}>
              <Button
                type="button"
                onClick={onClickHandler}
                variant="contained"
                fullWidth
                size="large"
              >
                Load more
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
});
