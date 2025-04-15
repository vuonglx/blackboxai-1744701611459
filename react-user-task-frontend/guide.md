# React User and Task Management Frontend - Function Guide

This frontend project is built with ReactJS and uses Tailwind CSS for styling. It simulates API calls with mock data for user and task management modules.

## Main Files and Components

### App.js
- Manages the main layout and navigation tabs between User Management and Task Management.
- Uses React state to switch between the two modules.

### components/UserManagement.js
- Displays a list of users with their name, email, and role.
- Supports CRUD operations:
  - Create: Add new users via a form.
  - Read: Display users in a table.
  - Update: Edit existing users by populating the form.
  - Delete: Remove users with confirmation.
- Simulates fetching users from an API with a delay.
- Manages form state and validation.
- Roles can be assigned from a predefined list.

### components/TaskManagement.js
- Displays a list of tasks with title, description, and status.
- Supports CRUD operations:
  - Create: Add new tasks via a form.
  - Read: Display tasks in a table.
  - Update: Edit existing tasks by populating the form.
  - Delete: Remove tasks with confirmation.
- Simulates fetching tasks from an API with a delay.
- Manages form state and validation.
- Task status can be selected from a predefined list.

## Simulated API Calls
- `fetchUsers` and `fetchTasks` simulate asynchronous API calls using `setTimeout` and return mock data.

## Styling
- Tailwind CSS is used for responsive and modern UI.
- Google Fonts (Inter) and Font Awesome icons are included for better aesthetics.

## Running the Project
- Run `npm install` to install dependencies.
- Run `npm start` to start the development server.
- The app will be available at `http://localhost:3000`.

## Extensibility
- The simulated API calls can be replaced with real API endpoints.
- Additional features like user-task assignment, role-based access control, and pagination can be added.
