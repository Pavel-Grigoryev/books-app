import { appActions, appReducer, InitialStateType } from 'app/app-reducer';

describe('appReducer', () => {
  let startState: InitialStateType;

  beforeEach(() => {
    startState = {
      status: 'idle',
      error: null,
    };
  });

  it('app should be changed its status', () => {
    const endState = appReducer(startState, appActions.setAppStatusAC('loading'));

    expect(endState.status).toBe('loading');
  });

  it('app should be changed its error message', () => {
    const endState = appReducer(startState, appActions.setAppErrorAC('Some error'));

    expect(endState.error).toBe('Some error');
    expect(endState.status).toBe('idle');
  });
});
