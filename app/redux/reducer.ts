
import {combineReducers} from "redux";
import { reducer as formReducer, FormStateMap } from 'redux-form';

const rootReducerCreator = () => combineReducers({
  form: formReducer
});

export interface StoreState {
  form: FormStateMap;
}

export default rootReducerCreator;
