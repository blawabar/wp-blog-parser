import { Helper } from "helpers";

const queryParams = Helper.createQueryParams({
  fields: "author,date,modified,title,short_URL,content",
});

export const fetchPost = (siteId, postId) => {
  return fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/${postId}/?${queryParams}`
  );
};
