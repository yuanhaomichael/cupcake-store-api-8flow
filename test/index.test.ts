import request from 'supertest';


describe('Cupcake API', () => {
  const app = "http://localhost:3000";

  test('POST /v2/cupcake - Add a new cupcake', () => {
    const cupcake = { id: 1, name: "Test Cupcake", price: 4.99 };
    return request(app)
      .post('/v2/cupcake')
      .send(cupcake)
      .expect(201)
      .expect(response => {
        expect(response.body).toEqual(cupcake);
      });
  });

  test('GET /v2/cupcake - List all cupcakes', () => {
    return request(app)
      .get('/v2/cupcake')
      .expect(200);
  });

  test('GET /v2/cupcake/:cupcakeId - Find cupcake by ID', () => {
    return request(app)
      .get('/v2/cupcake/1')
      .expect(200);
  });

  test('PUT /v2/cupcake/:cupcakeId - Update an existing cupcake', () => {
    const updatedCupcake = { name: 'Updated Test Cupcake', price: 5.99 };
    return request(app)
      .put('/v2/cupcake/1')
      .send(updatedCupcake)
      .expect(200);
  });

  test('DELETE /v2/cupcake/:cupcakeId - Deletes a cupcake', () => {
    return request(app)
      .delete('/v2/cupcake/1')
      .expect(204);
  });

});
