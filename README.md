```markdown
# API Viagens

Esta é uma API de exemplo para gerenciar usuários de um sistema de viagens. Ela inclui um CRUD completo para usuários, juntamente com testes automatizados usando Jest e Supertest.
Os dados são salvos em memória, uma array que armazena os dados, portanto não há conexão com banco de dados.

## Pré-requisitos

- Node.js
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/api-viagens.git
    cd api-viagens
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

## Executando a Aplicação

Para iniciar a aplicação, use o seguinte comando:

```bash
node app.js
```

A aplicação estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

- `app.js`: Arquivo principal da aplicação que define as rotas e inicializa o servidor.
- `usuario.test.js`: Arquivo contendo os testes das rotas de usuário.
- `package.json`: Arquivo de configuração do projeto e dependências.

## Testes

Este projeto usa Jest e Supertest para testes automatizados. Os testes estão localizados no arquivo `usuario.test.js`.

### Executando Testes

Para executar todos os testes, use:

```bash
npm test
```

### Cobertura de Testes

Para gerar um relatório de cobertura de testes, use:

```bash
npm run test:coverage
```

Após a execução, um relatório será gerado na pasta `coverage`. Para visualizar o relatório de cobertura em HTML, abra o arquivo `coverage/lcov-report/index.html` no seu navegador.

## Configuração do Jest

O Jest está configurado para coletar cobertura de testes a partir dos arquivos JavaScript na pasta `src`, exceto `index.js`. Aqui está a configuração relevante no `package.json`:

```json
"jest": {
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.js",
    "!src/index.js"
  ],
  "coverageReporters": ["html", "text"]
}
```

## Exemplos de Testes

Aqui estão alguns exemplos de testes implementados no arquivo `usuario.test.js`:

```javascript
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
```

## Contribuindo

Se você quiser contribuir com este projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
```

Este `README.md` cobre a instalação, configuração, execução de testes e geração de relatórios de cobertura, além de fornecer exemplos de como os testes estão estruturados.
 Sinta-se à vontade para ajustá-lo conforme necessário para refletir seu projeto e suas necessidades específicas.
