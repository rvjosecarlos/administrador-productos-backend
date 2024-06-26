import request from "supertest";
import server from "../server";

describe( 'Test server API connection', () => {

    it('Should be operative', async () => {
        const response = await request(server).get('/api');

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe('Desde API');

        expect(response.status).not.toEqual(404);
    });

});