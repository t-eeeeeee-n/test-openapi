import express from 'express';
import cors from 'cors';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
RegisterRoutes(app);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(3001, () => {
        console.log('Server running on http://localhost:3001');
    });
}

export default app;
