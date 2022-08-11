import actions from '../../redux/auth/authActions';

interface ReducerData {
  type: string;
  payload?: any;
}

const initialData = {};

export default (state = initialData, { type, payload }: ReducerData) => {
  return state;
};
