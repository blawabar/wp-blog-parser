import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Helper, formValidator } from "utils";
import { FormBody } from "./FormBody";
import {
  getPosts,
  setSearchData,
  setValidationErrors,
  setModalVisibility,
} from "data/actions";

const SearchForm = ({
  getPosts,
  setSearchData,
  setValidationErrors,
  setModalVisibility,
  searchData,
  errors,
  isShowingModal,
}) => {
  const handleOnChange = ({ target: { name, value } }) => {
    setSearchData({ name, value });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { formIsValid, errors } = formValidator.validateForm(searchData);

    if (formIsValid) {
      getPosts(searchData);
      setValidationErrors([]);
    } else {
      setValidationErrors(errors);
      setModalVisibility(true);
    }
  };

  return (
    <>
      <FormBody
        searchData={searchData}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
      {Helper.showModal("Form Validation Error", errors, isShowingModal, () =>
        setModalVisibility(false)
      )}
    </>
  );
};

SearchForm.propTypes = {
  getPosts: PropTypes.func,
  setSearchData: PropTypes.func,
  setValidationErrors: PropTypes.func,
  setModalVisibility: PropTypes.func,
  searchData: PropTypes.object,
  errors: PropTypes.array,
  isShowingModal: PropTypes.bool,
};

const mapStateToProps = ({ form: { searchData, errors, isShowingModal } }) => ({
  searchData,
  errors,
  isShowingModal,
});

export default connect(mapStateToProps, {
  getPosts,
  setSearchData,
  setValidationErrors,
  setModalVisibility,
})(SearchForm);
