import React, { useEffect, useState } from "react";
import axios from "axios";
import FormularioManga from "../FormularioManga/FormularioManga";

function MangaList() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const FetchAllMangas = async () => {
      try {
        const res = await axios.get("http://localhost:8800/mangas");
        setMangas(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    FetchAllMangas();
  }, []);

  const renderManga = (manga) => {
    setMangas([...mangas, manga]);
  };

  const RemoverManga = async (id) => {
    try {
      const xxx = await axios.delete("http://localhost:8800/mangas/" + id);
      setMangas(mangas.filter((mangas) => mangas.id !== xxx.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <FormularioManga onAddItem={renderManga} />
      <ul>
        {mangas.map((manga, index) => (
          <li key={index}>
            <h2>{manga.nome}</h2>
            <p>Autor: {manga.autor}</p>
            <p>Data de Publicação: {manga.publicacao}</p>
            <p>Sinopse: {manga.sinopse}</p>
            <button onClick={() => RemoverManga(manga.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MangaList;
