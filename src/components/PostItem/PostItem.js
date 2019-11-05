import React from "react";

import "./PostItem.scss";

const PostItem = ({
  ID,
  author,
  date,
  modified,
  title,
  excerpt,
  short_URL,
  attachments
}) => {
  const shortDate = date.substring(0, 10);
  const shortModified = modified.substring(0, 10);

  const renderImage = attachments => {
    let imgSrc = require("../../img/article-150.png");

    const keys = Object.keys(attachments);
    if (keys.length) {
      imgSrc = attachments[keys[0]].thumbnails.thumbnail;
    }

    return imgSrc;
  };

  const parseContent = content => {
    return new DOMParser().parseFromString(content, "text/html").documentElement
      .innerText;
  };

  return (
    <div className="post-item">
      <img className="post-item__image" src={renderImage(attachments)} alt="" />
      <section className="post-item__content">
        <header className="post-item__header">
          <p className="post-item__author">{author.name}</p>
          <p className="post-item__date">
            {shortDate}{" "}
            {shortDate !== shortModified
              ? ` (last modified on:${shortModified.substring(0, 10)})`
              : null}
          </p>
          <h2 className="post-item__title">{parseContent(title)}</h2>
        </header>
        <section className="post-item__body">{parseContent(excerpt)}</section>
        <footer className="post-item__footer">
          <a href={short_URL} target="blank" className="post-item__link">
            Read full article
          </a>
        </footer>
      </section>
    </div>
  );
};

export default PostItem;
