import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { headerAppBarSX, headerToolBarSX } from 'common/styles/sx/sx_styles';

export const Header = () => {
  return (
    <AppBar position="fixed" sx={headerAppBarSX}>
      <Toolbar variant="dense" sx={headerToolBarSX}>
        <Typography variant="h4" color="inherit" component="div">
          Books App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
