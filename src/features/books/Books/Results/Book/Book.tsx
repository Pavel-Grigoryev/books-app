import React, { useEffect } from 'react';
import { SmallContainer } from 'common/components/SmallContainer';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { bookActions, bookSelectors } from 'features/books';
import { useAppSelector } from 'common/hooks/useAppSelector';
import bookDefaultImage from 'assets/images/BookImage.png';
import { ReturnLink } from 'common/components/ReturnLink';
import { PATH } from 'common/constants/routes';
import { useMediaQuery } from 'react-responsive';
import { smallContMobSX, smallContSX } from 'common/styles/sx/sx_styles';
import s from './Book.module.scss';

export const Book = () => {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const book = useAppSelector(bookSelectors.selectBook);
  useEffect(() => {
    dispatch(bookActions.fetchBookTC(id!));
  }, [id]);

  let authors;
  if (book?.volumeInfo.authors?.length) {
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
  let categories;
  if (book?.volumeInfo.categories?.length) {
    const lastInd = book.volumeInfo.categories.length - 1;
    categories = book.volumeInfo.categories.map((category, index) => {
      const keyInd = book.id + index;
      return (
        <li key={keyInd}>
          {category}
          {lastInd === index ? '' : ','}
        </li>
      );
    });
  }
  let bookImage;
  if (book?.volumeInfo.imageLinks) {
    bookImage = book?.volumeInfo.imageLinks?.large
      ? book?.volumeInfo.imageLinks.thumbnail
      : book?.volumeInfo.imageLinks.thumbnail;
  }

  const isMobile = useMediaQuery({ query: '(max-width: 460px)' });

  const smallContainerStyle = isMobile ? smallContMobSX : smallContSX;

  return (
    <section className={s.bookSection}>
      <SmallContainer sx={smallContainerStyle}>
        <ReturnLink path={PATH.BOOKS_PAGE} title="Back to search" />
        <img
          className={s.image}
          src={bookImage || bookDefaultImage}
          alt={book?.volumeInfo.imageLinks ? 'Book cover' : ' '}
        />
        <div className={s.bookInfo}>
          <ul className={s.category}>{categories}</ul>
          <h1 className={s.title}>{book?.volumeInfo?.title}</h1>
          <h3 className={s.title}>{book?.volumeInfo?.subtitle}</h3>
          <ul className={s.authorsList}>{authors}</ul>
          <p className={s.desc}>{book?.volumeInfo.description}</p>
        </div>
      </SmallContainer>
    </section>
  );
};
