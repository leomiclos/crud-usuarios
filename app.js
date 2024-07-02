const express = require('express');
const app = express();

app.use(express.json());

let usuarios = [];
let currentId = 1;

app.post('/usuarios', (req, res) => {
  const { nome, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }
  const newUser = { id: currentId++, nome, telefone };
  usuarios.push(newUser);
  res.status(201).json(newUser);
});

app.get('/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id == req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

app.put('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id == req.params.id);
  if (user) {
    user.nome = req.body.nome;
    user.telefone = req.body.telefone;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

app.delete('/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id == req.params.id);
  if (index > -1) {
    usuarios.splice(index, 1);
    res.status(200).json({ message: 'Usuário removido com sucesso' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

const server = app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

module.exports = { app, server };
