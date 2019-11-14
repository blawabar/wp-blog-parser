import React from "react";

import "./AnimatedInfo.scss";

const AnimatedInfo = ({ textMessage }) => {
  const renderSpinner = () => {
    const items = Array.from({ length: 12 });
    return (
      <div className="animated-info__lds-spinner">
        {items.map((item, index) => (
          <div key={index}></div>
        ))}
      </div>
    );
  };

  return (
    <div className="animated-info">
      {renderSpinner()}
      <h3 className="animated-info__text">{textMessage}</h3>
    </div>
  );
};

export default AnimatedInfo;
