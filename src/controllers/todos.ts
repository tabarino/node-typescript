import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const newId = Math.floor((Math.random() * 1000000000) + 1).toString();
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(newId, text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'The Todo has been created!', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const newText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find Todo!');
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, newText);

  res.json({ message: 'The Todo has been updated!', updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find Todo!');
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: 'The Todo has been deleted!' });
};
