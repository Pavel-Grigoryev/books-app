import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { appActions } from 'app/app-reducer';

export const handleServerNetworkError = (
  err: AxiosError<{ error: string }>,
  dispatch: Dispatch
) => {
  const error = err.response?.data.error ? err.response.data.error : err.message;

  dispatch(appActions.setAppErrorAC(error));
  dispatch(appActions.setAppStatusAC('failed'));
};
