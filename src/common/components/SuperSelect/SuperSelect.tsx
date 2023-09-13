import React, { FC, PropsWithChildren } from 'react';

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { CategoriesType, OrderByType } from 'features/books/books-reducer';
import { selectSX } from 'common/styles/sx/sx_styles';

type PropsType = {
  formikGetFieldProps: any;
  defaultValue?: OrderByType | CategoriesType;
};

export const SuperSelect: FC<PropsWithChildren<PropsType>> = ({
  children,
  formikGetFieldProps,
  defaultValue,
}) => {
  return (
    <FormControl sx={{ width: '100%' }}>
      <Select defaultValue={defaultValue} {...formikGetFieldProps} sx={selectSX}>
        {children}
      </Select>
    </FormControl>
  );
};
