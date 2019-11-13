import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import "./PostContent.scss";

import Helper from "../../helpers/Helper";
import useFetch from "../../hooks/useFetch";

const PostContent = props => {
  const { siteId, postId } = props.match.params;
  const [isShowingModal, setIsShowingModal] = useState(false);
  const resultRef = useRef(null);

  const queryData = {
    baseURL: `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/${postId}/`,
    queryParams: Helper.createQueryParams({
      fields: "author,date,modified,title,short_URL,content"
    })
  };

  const { isLoading, data, error } = useFetch(queryData, true, [
    queryData.baseURL,
    queryData.queryParams
  ]);

  useEffect(() => {
    if (error) {
      setIsShowingModal(true);
    } else if (data && resultRef.current) {
      Helper.scrollToElement(resultRef);
    }
  }, [error, data]);

  const renderHeader = (author, date, modified, title) => {
    const shortDate = Helper.extractDate(date);
    const shortModified = Helper.extractDate(modified);
    const displayModifed = Helper.datesAreDifferent(shortDate, shortModified);

    return (
      <header className="post-content__header">
        <h1 className="post-content__title">
          {Helper.parseTextContent(title)}
        </h1>
        <ul className="post-content__info-list">
          <li className="post-content__info-item">
            <h3 className="post-content__info-heading">Author</h3>
            <h3 className="post-content__info-text">{author.name}</h3>
          </li>
          <li className="post-content__info-item">
            <h3 className="post-content__info-heading">Published</h3>
            <h3 className="post-content__info-text">{shortDate}</h3>
          </li>
          {displayModifed && (
            <li className="post-content__info-item">
              <h3 className="post-content__info-heading">Last modified</h3>
              <h3 className="post-content__info-text">{shortModified}</h3>
            </li>
          )}
        </ul>
      </header>
    );
  };

  const renderBody = content => {
    return (
      <section
        className="post-content__body"
        dangerouslySetInnerHTML={Helper.parseHTMLContent(content)}
        ref={resultRef}
      ></section>
    );
  };

  const renderFooter = short_URL => {
    return (
      <footer className="post-content__footer">
        <Link to="/">Go to search results</Link>
        <a href={short_URL} target="_blank" rel="noopener noreferrer">
          Visit site
        </a>
      </footer>
    );
  };

  const renderPostContent = data => {
    const { author, date, modified, title, short_URL, content } = data;
    return (
      <div className="post-content" ref={resultRef}>
        {renderHeader(author, date, modified, title)}
        {renderBody(content)}
        {renderFooter(short_URL)}
      </div>
    );
  };

  let content = null;

  if (isLoading) {
    content = Helper.showInfo("Loading post content...");
  } else if (data) {
    content = renderPostContent(data);
  } else if (error) {
    content = Helper.showModal(
      "Error during fetch",
      [error.message],
      isShowingModal,
      () => {
        setIsShowingModal(false);
        props.history.push("/");
      }
    );
  }

  return content;
};

export default PostContent;
