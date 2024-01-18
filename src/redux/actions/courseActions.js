import { ActionTypes } from "../constants/action-types";

export const setCourses = (products) => {
  return {
    type: ActionTypes.SET_COURSE,
    payload: products,
  };
};

export const selectedCourse = (product) => {
  return {
    type: ActionTypes.SELECTED_COURSE,
    payload: product,
  };
};
export const removeSelectedcourese = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_COURSE,
  };
};
