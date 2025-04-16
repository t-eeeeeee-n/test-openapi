import { Request, Response, NextFunction } from 'express';
import { logger } from '../pkg/logger';

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error('エラー発生', err);

    if (err instanceof Error) {
        const status = err.name === 'NotFoundError' ? 404 :
            err.name === 'BadRequestError' ? 400 : 500;

        return res.status(status).json({ error: err.message });
    }

    res.status(500).json({ error: 'Unexpected error' });
}
