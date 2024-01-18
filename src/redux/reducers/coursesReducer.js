import { ActionTypes } from "../constants/action-types";
const intialState = {
  products: [],
};

export const coursesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COURSE:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedCoursesReducer = (state = {}, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ActionTypes.SELECTED_COURSE:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_COURSE:
      return {};
    default:
      return state;
      
  }
};
