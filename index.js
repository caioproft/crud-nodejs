const express = require('express')

const server = express();

server.use(express.json());

function checkUserExists(req, res, next) {

  const { index } = req.params;

  if (!users[index]) {
    return res.status(400).json({ error: "Usuário não encontrado." });
  }

  return next();
};

function checkNameAndEmailExistsInRequestBody(req, res, next) {

  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: "Os campos de nome e e-mail são obrigatórios" });
  }

  return next();

};

users = [{ name: 'Caio', email: 'caio_proft@hotmail.com' }, { name: 'Felipe', email: 'felipesartori@hotmail.com' }];

server.get('/users', (req, res) => {

  return res.json(users);

});

server.get('/users/:index', checkUserExists, (req, res) => {

  const { index } = req.params;

  const { name, email } = users[index];

  return res.json({ name, email });
});

server.post('/users', checkNameAndEmailExistsInRequestBody, (req, res) => {

  const { name, email } = req.body;

  users.push({ name, email });

  return res.status(201).json('Usário criado com sucesso!');
});

server.put('/users/:index', checkNameAndEmailExistsInRequestBody, checkUserExists, (req, res) => {

  const { index } = req.params;
  const { name, email } = req.body

  users[index] = { name, email };

  return res.json('Dados atualizados.')

});

server.delete('/users/:index', checkUserExists, (req, res) => {

  const { index } = req.params;

  users.splice(index, 1);

  return res.send()
})

server.listen(3000);
