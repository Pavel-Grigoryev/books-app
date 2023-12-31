import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { appActions, appSelectors } from 'app';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
  const error = useAppSelector(appSelectors.selectError);

  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(appActions.setAppErrorAC(null));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}
