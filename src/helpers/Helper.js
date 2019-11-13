import React from "react";

import ModalPane from "../components/ModalPane/ModalPane";
import ModalWindow from "../components/ModalWindow/ModalWindow";

class Helper {
  static domParser = new DOMParser();

  static createQueryParams = values => {
    return new URLSearchParams(values).toString();
  };

  static parseTextContent = content => {
    return Helper.domParser.parseFromString(content, "text/html")
      .documentElement.innerText;
  };

  static parseHTMLContent = content => {
    const [body] = Helper.domParser
      .parseFromString(content, "text/html")
      .documentElement.getElementsByTagName("body");

    return body ? { __html: body.innerHTML } : <h1>Nothing has been found</h1>;
  };

  static extractDate = dateAsString => {
    if (typeof dateAsString === "string") {
      return dateAsString.substring(0, 10);
    }

    return "";
  };

  static datesAreDifferent = (date1, date2) => {
    return date1.localeCompare(date2) !== 0;
  };

  static scrollToElement = ref => {
    if (ref) {
      ref.current.scrollIntoView({ behavior: "smooth", start: "block" });
    }
  };

  static showModal = (title, messages, condition, toggleModal) => {
    if (condition) {
      return (
        <ModalPane>
          <ModalWindow
            title={title}
            errorList={messages}
            toggleModal={toggleModal}
          />
        </ModalPane>
      );
    }

    return null;
  };

  static showInfo = infoMessage => {
    return <ModalPane>{infoMessage}</ModalPane>;
  };
}

export default Helper;
