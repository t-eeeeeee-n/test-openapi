import request from 'supertest';
import app from '../src/server';

describe('POST /users (with DB)', () => {
    it('should create a user in SQLite DB', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'DB太郎' })
            .expect(200);

        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('DB太郎');
    });
});