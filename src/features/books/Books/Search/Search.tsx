import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { booksActions } from 'features/books/books-reducer';
import {
  formControlSX,
  formGroupSX,
  formLabelSX,
  twoFormControlSX,
} from 'common/styles/sx/sx_styles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import { searchSchema } from 'common/utils/validationSchema';
import style from 'common/styles/errors.module.scss';
import { booksSelectors } from 'features/books/index';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { SuperSelect } from 'common/components/SuperSelect';
import s from './Search.module.scss';

export const Search = () => {
  const dispatch = useAppDispatch();
  const searchParams = useAppSelector(booksSelectors.selectSearchParams);
  const sortingSelectNames = useAppSelector(booksSelectors.selectSortingSelectNames);
  const subjectSelectNames = useAppSelector(booksSelectors.selectSubjectSelectNames);

  const sortingNames = sortingSelectNames.map((el) => (
    <MenuItem key={el.id} value={el.name}>
      {el.name}
    </MenuItem>
  ));
  const subjectNames = subjectSelectNames.map((el) => (
    <MenuItem key={el.id} value={el.name}>
      {el.name}
    </MenuItem>
  ));

  useEffect(() => {
    if (searchParams.q) {
      dispatch(booksActions.setBooksTC());
    }
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      search: searchParams.q,
      orderBy: searchParams.orderBy,
      subject: searchParams.subject,
    },

    validationSchema: searchSchema,

    onSubmit: (values) => {
      dispatch(
        booksActions.setSearchParamsAC({
          q: values.search,
          orderBy: values.orderBy,
          subject: values.subject,
        })
      );
    },
  });

  return (
    <section className={s.searchSection}>
      <h1 className={s.title}>Search for books</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup sx={formGroupSX}>
          <FormControl sx={formControlSX}>
            <TextField
              margin="normal"
              className={s.textField}
              {...formik.getFieldProps('search')}
            />
            {formik.touched.search && formik.errors.search && (
              <div className={style.errorText}>{formik.errors.search}</div>
            )}
            <IconButton
              className={s.searchButton}
              type="submit"
              aria-label="search"
              color="primary"
            >
              <SearchIcon fontSize="large" />
            </IconButton>
          </FormControl>
          <FormControl sx={twoFormControlSX}>
            <FormLabel sx={formLabelSX}>
              Sorting by
              <SuperSelect
                defaultValue={searchParams.orderBy}
                formikGetFieldProps={formik.getFieldProps('orderBy')}
              >
                {sortingNames}
              </SuperSelect>
            </FormLabel>
            <FormLabel sx={formLabelSX}>
              Categories
              <SuperSelect
                defaultValue={searchParams.subject}
                formikGetFieldProps={formik.getFieldProps('subject')}
              >
                {subjectNames}
              </SuperSelect>
            </FormLabel>
          </FormControl>
        </FormGroup>
      </form>
    </section>
  );
};
