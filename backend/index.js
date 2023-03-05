import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

//Criando conexão com o bando de dados;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "crud_manga",
});

app.use(express.json());
app.use(cors());

//Pegando os dados do banco de dados e exibindo;
app.get("/mangas", (req, res) => {
  const q = "SELECT * FROM manga";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.delete("/mangas/:id", (req, res) => {
  const mangaId = req.params.id;
  const q = "DELETE FROM manga WHERE id = ?";

  db.query(q, [mangaId], (err, data) => {
    if (err) return res.json(err);
    return res.json("ok");
  });
});

//Inserindo os dados no banco
app.post("/addmangas", (req, res) => {
  const q =
    "INSERT INTO manga (`nome`, `autor`, `publicacao`, `sinopse`) VALUES (?)";
  const values = [
    req.body.nome,
    req.body.autor,
    req.body.publicacao,
    req.body.sinopse,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("manga added.");
  });
});

app.listen(8800);
