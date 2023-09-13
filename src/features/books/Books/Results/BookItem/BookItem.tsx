import React, { FC } from 'react';
import { BookType } from 'api/books-api';
import { SmallContainer } from 'common/components/SmallContainer';
import { bookItemContainerSX } from 'common/styles/sx/sx_styles';
import bookDafualtImage from 'assets/images/BookImage.png';
import s from './BookItem.module.scss';

type PropsType = {
  book: BookType;
};
export const BookItem: FC<PropsType> = ({ book }) => {
  let authors;
  if (book.volumeInfo.authors?.length) {
    const lastInd = book.volumeInfo.authors.length - 1;
    authors = book.volumeInfo.authors.map((author, index) => {
      const keyInd = book.id + index;
      return (
        <li key={keyInd}>
          {author}
          {lastInd === index ? '' : ','}
        </li>
      );
    });
  }
  let category;
  if (book.volumeInfo.categories?.length) {
    [category] = book.volumeInfo.categories;
  }
  return (
    <li>
      <article className={s.bookItem}>
        <SmallContainer sx={bookItemContainerSX}>
          <img
            className={s.image}
            src={
              book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.smallThumbnail
                : bookDafualtImage
            }
            alt={book.volumeInfo.imageLinks ? 'Book cover' : ' '}
          />
          <div className={s.bookInfo}>
            <p className={s.category}>{category}</p>
            <h3 className={s.title}>{book.volumeInfo?.title}</h3>
            <ul className={s.authorsList}>{authors}</ul>
          </div>
        </SmallContainer>
      </article>
    </li>
  );
};
