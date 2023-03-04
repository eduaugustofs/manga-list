import React, { useEffect, useState } from "react";
import axios from "axios";
import FormularioManga from "../FormularioManga/FormularioManga";

function MangaList(props) {
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

  const uuuu = (manga) => {
    setMangas([...mangas, manga]);
  };

  const RemoverManga = async (id) => {
    try {
      const res = await axios.delete("http://localhost:5000/mangas/" + id);
      setMangas(res.r);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <FormularioManga onPass={uuuu} />
      <ul>
        {mangas.map((manga) => (
          <div key={manga.id}>
            <li key={manga.id}>
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
