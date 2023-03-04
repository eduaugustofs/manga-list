import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

//Criando conexão com o bando de dados;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
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

//Inserindo os dados no banco
app.post("/bb", (req, res) => {
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
    return res.json("ok!!");
  });
});

//Aplicação funcionando em localghost 8800;
app.listen(5000);
