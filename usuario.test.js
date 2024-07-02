const request = require('supertest');
const { app, server } = require('./app');

describe('Testes das rotas de usuários', () => {
  afterAll((done) => {
    server.close(done); // Encerre o servidor após todos os testes
  });

  let userId;

  it('Deve adicionar um usuário corretamente', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({ nome: 'Alice', telefone: '123-456' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id; // Armazena o ID do usuário criado para os próximos testes
  });

  it('Deve listar os usuários corretamente', async () => {
    const response = await request(app)
      .get('/usuarios');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Deve obter um usuário pelo ID corretamente', async () => {
    const response = await request(app)
      .get(`/usuarios/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('nome', 'Alice');
  });

  it('Deve atualizar um usuário corretamente', async () => {
    const response = await request(app)
      .put(`/usuarios/${userId}`)
      .send({ nome: 'Alice Updated', telefone: '987-654' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('nome', 'Alice Updated');
  });

  it('Deve deletar um usuário corretamente', async () => {
    const response = await request(app)
      .delete(`/usuarios/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário removido com sucesso');
  });

  it('Deve retornar 404 ao tentar obter um usuário deletado', async () => {
    const response = await request(app)
      .get(`/usuarios/${userId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
  });

  it('Deve retornar 400 ao tentar adicionar um usuário com dados inválidos', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({ nome: '' }); // Dados inválidos

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Dados inválidos');
  });

  it('Deve retornar 404 ao tentar atualizar um usuário inexistente', async () => {
    const response = await request(app)
      .put('/usuarios/9999') // ID inexistente
      .send({ nome: 'Nome Inexistente', telefone: '000-000' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
  });

  it('Deve retornar 404 ao tentar deletar um usuário inexistente', async () => {
    const response = await request(app)
      .delete('/usuarios/9999'); // ID inexistente

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
  });

  it('Deve retornar uma lista vazia quando não há usuários', async () => {
    // Primeiro, vamos limpar a lista de usuários
    usuarios = []; // Resetando a lista de usuários

    const response = await request(app)
      .get('/usuarios');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(0);
  });
});
