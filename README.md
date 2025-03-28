# Next Session 🍪

This is an example implementation of cookie-based authentication with session stored in database.
The structure of this project follows the React Bulletproof architecture.

## Security

### Login

- The user enters their credentials.
- The server verifies the credentials.
- Upon success, the server generates a unique session ID and saves a new session.
- An HTTP-only cookie containing the session ID is sent to the browser.
- The user is then redirected to the home page.

### Logout

- The user clicks on the logout button.
- The session ID is retrieved from the cookies.
- The server delete the session in the database.
- The session cookie is cleared from the browser.
- The user is redirected to the home page.

### Other considerations

- Cookies are marked as HttpOnly to prevent access via JavaScript.
- Cookies are marked as Secure to ensure transmission over HTTPS only.
- SameSite=Strict parameter is used to prevent CSRF attacks.
- Sessions expire after 7 days.
- Passwords are hashed with a unique salt before storage.

## Tech Stack

- **Database:** Postgres + Kysely
- **Design System:** Shadcn

## Run Locally

Clone the project

```bash
  git clone https://github.com/tomguillermou/next-session.git
```

Go to the project directory

```bash
  cd next-session
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`
