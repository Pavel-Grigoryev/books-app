import * as Yup from 'yup';

const validate = {
  search: Yup.string().required('Required'),
};
export const searchSchema = Yup.object().shape({
  search: validate.search,
});
