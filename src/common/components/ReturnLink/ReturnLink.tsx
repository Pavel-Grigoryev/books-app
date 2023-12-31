import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import backArrow from 'assets/images/backArrow.svg';
import s from './ReturnLink.module.scss';

type PropsType = {
  path: string;
  title: string;
};
export const ReturnLink: FC<PropsType> = ({ path, title }) => {
  return (
    <div className={s.returnLink}>
      <Link to={path}>
        <img src={backArrow} alt="" />
        <span className={s.title}>{title}</span>
      </Link>
    </div>
  );
};
