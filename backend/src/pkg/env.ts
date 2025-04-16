import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    PORT: z.string().optional().default('3001'),
});

export const env = envSchema.parse(process.env);
