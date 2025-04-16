import { Request, Response, NextFunction } from 'express';
import { logger } from '../pkg/logger';

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    logger.error('Unhandled error', err);

    if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
    }

    res.status(500).json({ error: 'Unexpected error' });
};