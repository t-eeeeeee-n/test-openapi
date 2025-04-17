import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default_access_secret';

export interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}

export const jwtMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { userId: string };
        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
