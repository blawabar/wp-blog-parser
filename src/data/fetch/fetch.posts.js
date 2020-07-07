export const fetchPosts = (queryData) => {
  const { domain, queryParams } = queryData;

  return fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/${domain}/posts/?${queryParams}`
  );
};
