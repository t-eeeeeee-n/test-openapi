import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default_access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
};

export const verifyAccessToken = (token: string): { userId: string } => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as { userId: string };
};

export const verifyRefreshToken = (token: string): { userId: string } => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: string };
};
