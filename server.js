const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = ;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pizzaria_final",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
});

// Rota para obter todos os pedidos
app.get("/pedidos", (req, res) => {
  const query = "SELECT * FROM pedido_pizzaria";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Rota para criar um novo pedido
app.post("/pedidos", (req, res) => {
  const { pizzaType, bebidastype, tamanhoPizza } = req.body;
  const query =
    "INSERT INTO pedido_pizzaria (pizzaType, bebidastype, tamanhoPizza) VALUES (?, ?, ?)";
  db.query(query, [pizzaType, bebidastype, tamanhoPizza], (err, result) => {
    if (err) {
      console.error("Erro ao inserir pedido:", err); // Log do erro
      return res.status(500).send(err);
    }
    res.status(201).json({
      id: result.insertId,
      pizzaType,
      bebidastype,
      tamanhoPizza,
    });
  });
});

// Rota para editar um pedido
app.put("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  const { pizzaType, bebidastype, tamanhoPizza } = req.body;
  const query =
    "UPDATE pedido_pizzaria SET pizzaType = ?, bebidastype = ?, tamanhoPizza = ? WHERE id = ?";
  db.query(query, [pizzaType, bebidastype, tamanhoPizza, id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id, pizzaType, bebidastype, tamanhoPizza });
  });
});

// Rota para remover um pedido
app.delete("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM pedido_pizzaria WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(204); // No Content
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
