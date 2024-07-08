# Express.js Ad Management System

## Submitted by:
- **David Zaydenberg - Davidzay@edu.hac.ac.il**
- **Ron Elian - Ronel@edu.hac.ac.il**

## Project Overview

This project is an Express.js-based web application for managing advertisements. It provides functionality for user authentication, ad creation, moderation, and viewing.

## Project Structure

The project is structured as follows:

- `bin/`: Contains the main application file
- `config/`: Configuration files
- `controllers/`: Route handlers
- `middleware/`: Custom middleware functions
- `Models/`: Data models
- `public/`: Static assets
  - `javascripts/`: Client-side JavaScript files
- `routes/`: Express routes
- `views/`: EJS templates
- `app.js`: Main application setup
- `package.json`: Project dependencies and scripts

## Features

- User authentication and authorization
- Ad creation and management
- Ad moderation for administrators
- Responsive front-end using EJS templates

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the server, run:

```
npm start
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

## Dependencies

Main dependencies include:

- Express.js: Web application framework
- EJS: Templating engine
- Sequelize: ORM for database management
- bcrypt: Password hashing
- express-session: Session management
- connect-session-sequelize: Session store for Sequelize
- SQLite3: Database engine

For a full list of dependencies, refer to `package.json`.

## Development

For development purposes, you can use nodemon to automatically restart the server on file changes:

```
npx nodemon
```
