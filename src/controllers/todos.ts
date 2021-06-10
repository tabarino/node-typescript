import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const newId = Math.floor((Math.random() * 1000000000) + 1).toString();
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(newId, text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'The todo has been created!', createdTodo: newTodo });
};
