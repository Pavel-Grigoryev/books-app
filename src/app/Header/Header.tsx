import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import { headerAppBarSX, headerToolBarSX, linProgressSX } from 'common/styles/sx/sx_styles';
import { appSelectors } from 'app/index';
import { useAppSelector } from 'common/hooks/useAppSelector';

export const Header = () => {
  const status = useAppSelector(appSelectors.selectStatus);

  return (
    <AppBar position="fixed" sx={headerAppBarSX}>
      <Toolbar variant="dense" sx={headerToolBarSX}>
        <Typography variant="h4" color="inherit" component="div">
          Books App
        </Typography>
      </Toolbar>
      {status === 'loading' && <LinearProgress color="secondary" sx={linProgressSX} />}
    </AppBar>
  );
};
