import express from 'express';
import cors from 'cors';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { errorHandler } from "./middleware/errorHandler";
import { jwtMiddleware } from "./middleware/jwtMiddleware";

const allowedOrigins = process.env.CORS_ORIGIN?.split(',') ?? [];

const app = express();
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
RegisterRoutes(app);
app.use('/users', jwtMiddleware as express.RequestHandler);
app.use(errorHandler as express.ErrorRequestHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(3001, () => {
        console.log('Server running on http://localhost:3001');
    });
}

export default app;
