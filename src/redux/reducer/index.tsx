import { combineReducers } from "redux";
import people from './progessReducer';

const rootReducer = combineReducers({
    people,
}); 
export default rootReducer;