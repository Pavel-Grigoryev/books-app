import { useDispatch } from 'react-redux';
import { AppDispatchType } from 'common/utils/types';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
