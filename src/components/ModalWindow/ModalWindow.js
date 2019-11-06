import React from "react";

import "./ModalWindow.scss";

const ModalWindow = ({ errorList, toggleModal }) => {
  console.log({ errorList });

  const renderErrorList = () => {
    return (
      <ol className="modal-window__error-list">
        {errorList.map((error, indx) => (
          <li className="modal-window__error-item" key={indx}>
            {error},
          </li>
        ))}
      </ol>
    );
  };
  return (
    <div className="modal-window">
      <header className="modal-window__header">
        <h2 className="modal-window__title">Form Validation Error</h2>
      </header>
      <section className="modal-window__body">{renderErrorList()}</section>
      <button className="modal-window__btn" onClick={toggleModal}>
        OK
      </button>
    </div>
  );
};

export default ModalWindow;
