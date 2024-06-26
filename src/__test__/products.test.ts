import request from "supertest";
import server from "../server";

describe( 'GET api/products', () => {
    
    it('Should check if api/products exist', async () =>{
        const response = await request(server).get('/api/products');
        expect(response.status).not.toEqual(404);
    });

    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toEqual(400);
        expect(response.status).not.toEqual(404);
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('POST api/products', () => {
    
    it('Should check if api/products exist', async () =>{
        const response = await request(server).post('/api/products').send({
            name: 'TV Plasma - test',
            price: 5000
        });

        expect(response.status).toEqual(201);
    });

    it('Should be add a product', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'TV Plasma - test',
            price: 5000
        });

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toEqual(400);
        expect(response.body).not.toHaveProperty('errors');
    });

    it('Should display error if send an empty object', async () =>{
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toEqual(201);
        expect(response.body).not.toHaveProperty('data');
        expect(response.body.errors).not.toHaveLength(2);
    });

    it('Should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'TV Plasma - test',
            price: 0
        });

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toEqual(201);
        expect(response.body).not.toHaveProperty('data');
        expect(response.body.errors).not.toHaveLength(2);

    });
});

describe('GET api/products/id', () => {

    it('Should return a 404 code for a non-exist product', async () => {
        const id = 100;
        const response = await request(server).get(`/api/products/${id}`);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');

        expect(response.status).not.toEqual(200);
        expect(response.body).not.toHaveProperty('data');

    });

    it('Should return 400 code for a invalid id', async () => {
        const id = 'not-valid-id';
        const response = await request(server).get(`/api/products/${id}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Id no válido');

        expect(response.status).not.toEqual(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('Should return a JSON response with the data from db', async () => {
        const response = await request(server).get('/api/products/1');

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toEqual(404);
        expect(response.status).not.toEqual(400);
        expect(response.body).not.toHaveProperty('errors');

    });
});

describe('PUT /api/products/:id', () => {

    it('Should display validation error message when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({});

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(6);

        expect(response.status).not.toEqual(200);
        expect(response.body).not.toHaveProperty('data');

    });

    it('Should validate that the price is greater than 0', async () => {
        const response = await request(server)
                                        .put('/api/products/1')
                                        .send({
                                            "name": "TV Plasma - test PUT",
                                            "price": -5000,
                                            "disponibilidad": true
                                        });

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Precio no válido');

        expect(response.status).not.toEqual(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server)
                                        .put('/api/products/not-valid-url')
                                        .send({
                                            "name": "TV Plasma - test PUT",
                                            "price": 5000,
                                            "disponibilidad": true
                                        });

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Id no válido');

        expect(response.status).not.toEqual(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('Should return a 404 response for a non-existent product', async () => {
        const response = await request(server)
                                        .put('/api/products/10')
                                        .send({
                                            "name": "TV Plasma - test PUT",
                                            "price": 5000,
                                            "disponibilidad": true
                                        });

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toBe('Producto no encontrado');

        expect(response.status).not.toEqual(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('Should return a 200 for a valid Id', async () => {
        const response = await request(server)
                                        .put('/api/products/1')
                                        .send({
                                            "name": "TV Plasma - test PUT",
                                            "price": 5000,
                                            "disponibilidad": true
                                        });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('data');
        
        expect(response.body.error).not.toBeTruthy();
        expect(response.body.error).not.toBe('Producto no encontrado');
    });

});

describe('PATCH /api/products/:id', () => {
    
    it('Should check a valid ID', async () => {
        const response = await request(server).patch('/api/products/not-valid-id');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('Id no válido');
    });

    it('Should return 404 response for a non-existent product', async () => {
        const id = 10;
        const response = await request(server).patch(`/api/products/${id}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
    });

    it('Should return a 200 for a valid Id', async () => {
        const response = await request(server).patch('/api/products/1');

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('data');
        
        expect(response.body.error).not.toBeTruthy();
        expect(response.body.error).not.toBe('Producto no encontrado');
    });

});

describe('DELETE /api/products/:id', () => {

    it('Should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid-id');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('Id no válido');
    });

    it('Should return 404 response for a non-existent product', async () => {
        const id = 10;
        const response = await request(server).delete(`/api/products/${id}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
    });

    it('Should return a 200 for a valid Id', async () => {
        const response = await request(server).delete('/api/products/1');

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBe('Producto eliminado');
        
        expect(response.body.error).not.toBeTruthy();
        expect(response.body.error).not.toBe('Producto no encontrado');
    });

});