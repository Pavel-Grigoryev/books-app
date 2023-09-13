import React from 'react';
import { Search } from 'features/books/Books/Search';
import { Results } from 'features/books/Books/Results';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { booksSelectors } from 'features/books/index';

export const Books = () => {
  const totalBooks = useAppSelector(booksSelectors.selectTotalBooks);
  return (
    <>
      <Search />
      {totalBooks !== null && <Results totalBooks={totalBooks} />}
    </>
  );
};
