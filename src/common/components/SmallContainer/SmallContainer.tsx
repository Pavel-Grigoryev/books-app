import React, { FC, PropsWithChildren } from 'react';
import { Container } from '@mui/material';

type PropsType = {
  sx: any;
};
export const SmallContainer: FC<PropsWithChildren<PropsType>> = ({ children, sx }) => {
  return (
    <Container color="secondary" sx={sx} maxWidth="sm">
      {children}
    </Container>
  );
};
