import { reset, } from 'redux-form';

export default formID => (action, dispatch) => dispatch(reset(formID));
