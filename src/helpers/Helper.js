import React from "react";

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
}

export default Helper;
