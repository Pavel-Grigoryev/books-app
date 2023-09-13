import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { booksActions } from 'features/books/books-reducer';

export const Search = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(booksActions.setBooksTC());
  }, []);
  return (
    <div>
      <h1>Search for books</h1>
      <form>
        <FormGroup>
          <TextField margin="normal" />

          <FormControl>
            <FormLabel>
              Categories
              {/* <SyperSelect formikGetFieldProps={formik.getFieldProps('pipe')}>
                {inputPipeType}
              </SyperSelect> */}
            </FormLabel>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </FormGroup>
      </form>
    </div>
  );
};
