import React from "react";

import { Link } from "react-router-dom";

import "./PostItem.scss";

import Helper from "../../helpers/Helper";

const PostItem = ({
  site_ID,
  ID,
  author,
  date,
  modified,
  title,
  excerpt,
  attachments
}) => {
  const shortDate = Helper.extractDate(date);
  const shortModified = Helper.extractDate(modified);

  const renderImage = attachments => {
    let imgSrc = require("../../img/article-150.png");

    const keys = Object.keys(attachments);
    if (keys.length) {
      imgSrc = attachments[keys[0]].thumbnails.thumbnail;
    }

    return imgSrc;
  };

  return (
    <div className="post-item">
      <img className="post-item__image" src={renderImage(attachments)} alt="" />
      <section className="post-item__content">
        <header className="post-item__header">
          <p className="post-item__author">{author.name}</p>
          <p className="post-item__date">
            {shortDate}{" "}
            {Helper.datesAreDifferent(shortDate, shortModified)
              ? ` (last modified on: ${shortModified})`
              : null}
          </p>
          <h2 className="post-item__title">{Helper.parseTextContent(title)}</h2>
        </header>
        <section className="post-item__body">
          {Helper.parseTextContent(excerpt)}
        </section>
        <footer className="post-item__footer">
          <Link to={`/${site_ID}/${ID}`}>Go to Post Content</Link>
        </footer>
      </section>
    </div>
  );
};

export default PostItem;
