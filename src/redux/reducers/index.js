import { combineReducers } from "redux";
import { coursesReducer,  selectedCoursesReducer,   } from "./coursesReducer";
const reducers = combineReducers({
  allProducts: coursesReducer,
  product: selectedCoursesReducer,
});
export default reducers;
