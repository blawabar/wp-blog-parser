import {
  SET_SEARCH_DATA,
  SET_VALIDATION_ERRORS,
  SET_MODAL_VISIBILITY,
} from "data/types";

const INITIAL_STATE = {
  searchData: { domain: "", searchPhrase: "", searchLimit: 5, orderBy: "date" },
  errors: [],
  isShowingModal: false,
};

export const formReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_DATA:
      const { name, value } = payload;
      return {
        ...state,
        searchData: { ...state.searchData, [name]: value },
      };
    case SET_VALIDATION_ERRORS:
      return { ...state, errors: payload };
    case SET_MODAL_VISIBILITY:
      return {
        ...state,
        isShowingModal: payload,
      };

    default:
      return state;
  }
};
