import React, { useEffect, useState } from "react";
import axios from "axios";

function MangaList() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const FetchAllMangas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/mangas");
        setMangas(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    FetchAllMangas();
  }, []);

  const RemoverManga = async (id) => {
    try {
      await axios.delete("http://localhost:5000/mangas/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ul>
        {mangas.map((manga) => (
          <div key={manga.id}>
            <li>
              <h2>{manga.nome}</h2>
              <p>Autor: {manga.autor}</p>
              <p>Data de Publicação: {manga.data}</p>
              <p>Sinopse: {manga.sinopse}</p>
              <button onClick={() => RemoverManga(manga.id)}>Excluir</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MangaList;
