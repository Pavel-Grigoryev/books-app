export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
};

// Actions

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status }) as const;
export const setAppErrorAC = (error: null | string) => ({ type: 'APP/SET-ERROR', error }) as const;

// Types

type InitialStateType = typeof initialState;
type SetAppStatusAT = ReturnType<typeof setAppStatusAC>;
type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
export type AppActionsType = SetAppStatusAT | SetAppErrorAT;
