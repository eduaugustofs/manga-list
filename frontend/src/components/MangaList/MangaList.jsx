import React, { useEffect, useState } from "react";
//import FormularioManga from "../FormularioManga/FormularioManga";
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

  const removerManga = (index) => {
    const mangasRestantes = [...mangas];
    mangasRestantes.splice(index, 1);
    console.log(mangasRestantes);
    setMangas(mangasRestantes);
  };

  return (
    <div>
      {mangas.length === 0 && <p>Nenhum mangá adicionado</p>}
      <ul>
        {mangas.map((manga, index) => (
          <li key={index}>
            <h2>{manga.nome}</h2>
            <p>Autor: {manga.autor}</p>
            <p>Data de Publicação: {manga.data}</p>
            <p>Sinopse: {manga.sinopse}</p>
            <button onClick={() => removerManga(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MangaList;
