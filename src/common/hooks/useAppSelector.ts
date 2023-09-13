import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppRootStateType } from 'common/utils/types';

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
