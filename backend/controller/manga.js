import { db } from "../db.js";

//O controller pega os dados do banco de dados.
//A função primeiro vai checar se tem erro. (if(err))..
//Caso não haja, retorna o data.

export const getManga = (_, res) => {
  const q = "SELECT * from manga";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
