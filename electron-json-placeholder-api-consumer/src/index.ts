import { ToDoListApp } from './app';

// set the process environment variable
process.env.NODE_ENV = 'production';
// process.env.NODE_ENV = 'development';

const toDoListApp = new ToDoListApp();
