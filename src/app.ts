import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import todoRoutes from './routes/todos';

const app = express();

// JSON Middleware - Extract the JSON from the Request
app.use(json())

// Middleware to call Routes
app.use('/todos', todoRoutes);

// Error Handler Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
