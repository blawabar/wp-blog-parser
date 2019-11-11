import React from "react";

import { Link } from "react-router-dom";

import "./PostContent.scss";

import Helper from "../../helpers/Helper";
import useFetch from "../../hooks/useFetch";

const PostContent = props => {
  const { siteId, postId } = props.match.params;
  const baseURL = `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/${postId}/`;
  const queryParams = Helper.createQueryParams({
    fields: "author,date,modified,title,short_URL,content"
  });

  const { isLoading, data, error } = useFetch(baseURL, queryParams, true);

  const renderHeader = (author, date, modified, title) => {
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
            <h3 className="post-content__info-text">{date.substring(0, 10)}</h3>
          </li>
          <li className="post-content__info-item">
            <h3 className="post-content__info-heading">Last modified</h3>
            <h3 className="post-content__info-text">
              {modified.substring(0, 10)}
            </h3>
          </li>
        </ul>
      </header>
    );
  };

  const renderBody = content => {
    return (
      <section
        className="post-content__body"
        dangerouslySetInnerHTML={Helper.parseHTMLContent(content)}
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
      <div className="post-content">
        {renderHeader(author, date, modified, title)}
        {renderBody(content)}
        {renderFooter(short_URL)}
      </div>
    );
  };

  let content = null;

  if (isLoading) {
    content = (
      <h1 className="post-content__message post-content__message--is-loading">
        Loading post content...
      </h1>
    );
  } else if (data) {
    content = renderPostContent(data);
  } else if (error) {
    content = (
      <>
        <h1 className="post-content__message post-content__message--has-error">
          Error durring fetch: {error.message}
        </h1>
        <h2 className="post-content__message post-content__message--has-error">
          Redirecting to the main page in 5 secs.
        </h2>
        {setTimeout(() => {
          props.history.push("/");
        }, 5000)}
      </>
    );
  }

  return content;
};

export default PostContent;
