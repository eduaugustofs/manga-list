import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

//creating conection with db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "crud_manga",
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.log("Error connecting to database");
    return;
  }
  console.log("Connected to database");
});

app.use(express.json());
app.use(cors());

//getting all mangas
app.get("/mangas", (req, res) => {
  const q = "SELECT * FROM manga";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// Get a manga by id
app.get("/mangas/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM manga WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error getting manga");
      return;
    }
    console.log(result);
    if (result.length === 0) {
      res.status(404).send("Manga not found");
      return;
    }
    res.status(200).json(result[0]);
  });
});

//delete a manga by id
app.delete("/mangas/:id", (req, res) => {
  const mangaId = req.params.id;
  const q = "DELETE FROM manga WHERE id = ?";

  db.query(q, [mangaId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//update a manga by id
app.put("/mangas/:id", (req, res) => {
  const mangaId = req.params.id;
  const q = "UPDATE manga SET `nome` = ?, `autor` = ?, `publicacao` = ?, `sinopse` = ? WHERE id = ? ";
  const values = [req.body.nome, req.body.autor, req.body.publicacao, req.body.sinopse];
  db.query(q, [...values, mangaId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//add
app.post("/addmangas", (req, res) => {
  const q = "INSERT INTO manga (`nome`, `autor`, `publicacao`, `sinopse`) VALUES (?)";
  const values = [req.body.nome, req.body.autor, req.body.publicacao, req.body.sinopse];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800);
