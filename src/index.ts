import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import { AppError } from './AppError';

import routes from './routes/routes';

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.use (routes)

app.get('/', (request, response) => {
    return response.status(200).json({ status: 'ok' });
  });
  
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        error: error.message,
      });
    }
  
    return response.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})