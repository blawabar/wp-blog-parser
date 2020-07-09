import {
  SET_SEARCH_DATA,
  SET_VALIDATION_ERRORS,
  SET_MODAL_VISIBILITY,
} from "data/types";

export const setSearchData = (data) => ({
  type: SET_SEARCH_DATA,
  payload: data,
});

export const setValidationErrors = (errors) => ({
  type: SET_VALIDATION_ERRORS,
  payload: errors,
});

export const setModalVisibility = (isModalVisible) => ({
  type: SET_MODAL_VISIBILITY,
  payload: isModalVisible,
});
