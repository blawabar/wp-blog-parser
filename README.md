# Wordpress Posts Fetcher (made with React)

## About the project

This application fetches and displays list of posts from a WordPress blog.

### Seach form

Using a formular user has the ability to provide following search criteria like:

1. domain name,
2. search phrase,
3. sorting mechanism (by date of creation, last date of update, title),
4. number of returned results (from 5 to 100),

Once the "Search" button is clicked and the form is valid, the GET request is sent according to the specifiation [https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/#apidoc-query](https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/#apidoc-query).

### Data validation

If the seach form data is invalid, then a dialog box with a list of errors is shown to the user and the request is not sent.

### Showing a posts list

According to the sent request a post lists will be displayed under the search form. In case of an error there will be proper error message displayed to the user via dialog box.

### Showing a single post

Once the user clicks a selected post, its content is loaded via API [https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/%24post_ID/](https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/%24post_ID/) and displayed on the application page. The search formular disappears. User has the ability to move back to the search formular by clicking "Go to search results" button (the search formular's content stays intact.) or to visit the post's site by clicking "Visit site" button.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
