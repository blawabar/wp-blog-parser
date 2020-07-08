import { Helper } from "utils";

export const fetchPosts = (searchData) => {
  const { domain, searchPhrase, searchLimit, orderBy } = searchData;

  const queryParams = Helper.createQueryParams({
    fields:
      "ID,site_ID,author,date,modified,title,short_URL,excerpt,attachments",
    number: searchLimit,
    order_by: orderBy,
    search: searchPhrase,
  });

  return fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/${domain}/posts/?${queryParams}`
  );
};
