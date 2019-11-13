import React, { useState, useRef, useEffect } from "react";

import "./PostList.scss";

import useFetch from "../../hooks/useFetch";
import Helper from "../../helpers/Helper";

import PostItem from "../PostItem/PostItem";

const CACHED_STATE = "fetchState";

const PostList = ({ queryData }) => {
  const resultRef = useRef(null);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [cachedData, setCachedData] = useState(null);

  const { isLoading, error, data } = useFetch(queryData, !!queryData, [
    queryData
  ]);

  useEffect(() => {
    // 0. Check if cache is empty
    if (!cachedData) {
      //1. Check session storage
      const cachedState = sessionStorage.getItem(CACHED_STATE);

      // 2. If it has data, use it to update state
      if (cachedState) {
        setCachedData(JSON.parse(cachedState));
      }
    } else if (cachedData) {
      // 3. Scroll to list
      Helper.scrollToElement(resultRef);
    }

    // 4. Check data
    if (data) {
      // 5. Persist data into sessionStorage
      sessionStorage.setItem(CACHED_STATE, JSON.stringify(data));
      // 5. Scroll to list
      Helper.scrollToElement(resultRef);
    } else if (error) {
      setIsShowingModal(true);
    }
  }, [data, error, cachedData]);

  const renderPostList = data => (
    <div ref={resultRef} className="post-list">
      <h1 className="post-list__heading">Search Results</h1>
      <h2 className="post-list__info">
        {data.posts.length} Posts have been found
      </h2>
      {data.posts.map(post => (
        <PostItem key={post.ID} {...post} />
      ))}
    </div>
  );

  const renderErrorMsg = () =>
    Helper.showModal("Fetch error", [error.message], isShowingModal, () =>
      setIsShowingModal(false)
    );

  const renderLoadingInfo = () => Helper.showInfo("Loading posts data...");

  let content = null;

  if (error) {
    content = renderErrorMsg();
  } else if (isLoading) {
    content = renderLoadingInfo();
  } else if (data || cachedData) {
    content = renderPostList(data || cachedData);
  }

  return content;
};

export default PostList;
