import React from "react";
import { createPortal } from "react-dom";

import { ModalPane, ModalWindow, AnimatedInfo } from "components";

class Helper {
  static domParser = new DOMParser();

  static createQueryParams = (values) => {
    return new URLSearchParams(values).toString();
  };

  static parseTextContent = (content) => {
    return Helper.domParser.parseFromString(content, "text/html")
      .documentElement.innerText;
  };

  static parseHTMLContent = (content) => {
    const [body] = Helper.domParser
      .parseFromString(content, "text/html")
      .documentElement.getElementsByTagName("body");

    return body ? { __html: body.innerHTML } : <h1>Nothing has been found</h1>;
  };

  static extractDate = (dateAsString) => {
    if (typeof dateAsString === "string") {
      return dateAsString.substring(0, 10);
    }

    return "";
  };

  static datesAreDifferent = (date1, date2) => {
    return date1.localeCompare(date2) !== 0;
  };

  static scrollToElement = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", start: "block" });
    }
  };

  static showModal = (title, messages, shouldBeShown, toggleModal) => {
    if (shouldBeShown) {
      return createPortal(
        <ModalPane>
          <ModalWindow
            title={title}
            errorList={messages}
            toggleModal={toggleModal}
          />
        </ModalPane>,
        document.getElementById("portal")
      );
    }

    return null;
  };

  static showInfo = (infoMessage) => {
    return (
      <ModalPane>
        <AnimatedInfo textMessage={infoMessage} />
      </ModalPane>
    );
  };
}

export default Helper;
