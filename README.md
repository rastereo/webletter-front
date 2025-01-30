# Webletter Frontend

<div align="center">
  <img src="https://i.ibb.co/MBttJz8/1.png" alt="Image 1" width="400" border="0" />
  <img src="https://i.ibb.co/KDVGPtt/2.png" alt="Image 2" width="400" border="0" />
</div>

WebLetter is a web application for browsing a catalog of ready-made HTML emails. It provides a user-friendly interface for searching emails by sender name, subject, language, and date, as well as viewing each email in detail. This makes it especially useful for marketers and other professionals involved in email campaigns.

## 🔧Installation

To get started with the project, ensure that you have [Node.js](https://nodejs.org/en) installed. Then, clone this repository and install the dependencies:

```bash
git clone https://github.com/rastereo/webletter-front.git
cd webletter-front
npm install
```

## 🌍Environment Variables

The project utilizes several environment variables for configuration. These should be defined in a `.env` file at the root of your project. Below is a description of each variable:

- `VITE_APP_SERVER_BASE_URL`: The base URL for the main server.
- `VITE_APP_DEV_SERVER_BASE_URL`: Base URL for the development server.
- `VITE_APP_HTML_WEBLETTER_URL`: The base URL for web letter resources.
- `VITE_APP_LOGIN_PATH`: The path for logging into the application.
- `VITE_APP_LOGOUT_PATH`: The path for logging out of the application.
- `VITE_APP_VERIFY_PATH`: The path for token verification.
- `VITE_APP_WEBLETTERS_PATH`: The path to access web letter data.
- `VITE_APP_SEARCH_WEBLETTERS_PATH`: The path for searching web letters.
- `VITE_APP_WEBLETTER_TEXT_PATH`: The path for accessing the text content of web letters.
- `VITE_APP_JWT_COOKIE_NAME`: The name of the cookie used to store JWT tokens. -->
- `VITE_APP_CREDENTIALS`: Credentials configuration, typically used to manage if credentials like cookies are sent with requests.

Ensure that these variables are properly configured in your environment to enable the application to function as expected.

## ⚙️Scripts

The project defines several npm scripts to streamline development workflows.

- Builds the application using TypeScript and Vite.

```bash
npm run build
```

- Starts a development server using Vite.

```bash
npm run dev
```

## 🔀Routing

- `/:` Displays the search page for querying web letters.
- `/:id` Viewer for displaying a specific web letter based on its ID.
- `/login` A login page for user authentication.

The ProtectedRoute component ensures that only authenticated users can access certain routes.

## 🤖 Technologies

The project leverages the following technologies:

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://www.chakra-ui.com/)
- [Dark Reader](https://www.npmjs.com/package/darkreader)
