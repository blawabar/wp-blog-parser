class FormValidator {
  constructor() {
    let errors = [];
    const regExp = /^[a-z0-9][a-z0-9-]*[a-z0-9](\.[a-z0-9]+[a-z0-9-]*[a-z0-9]+)*\.[a-z][a-z]*[a-z]$/;

    const isDomainNameNotValid = (domainName) => {
      const formatIsNotValid = !regExp.test(domainName);
      const lengthIsNotValid = domainName.length < 4 || domainName.length > 100;

      return formatIsNotValid || lengthIsNotValid;
    };

    const isSearchLimitNotValid = (searchLimit) =>
      searchLimit < 5 || searchLimit > 100;

    this.validateForm = ({ domain, searchLimit }) => {
      errors = [];

      if (isDomainNameNotValid(domain)) {
        errors.push("Please enter a valid domain name (max. 100 chars.)");
      }

      if (isSearchLimitNotValid(searchLimit)) {
        errors.push("Please enter a valid search limit (from 5 to 100)");
      }

      return { formIsValid: errors.length === 0, errors };
    };
  }
}

export default new FormValidator();
