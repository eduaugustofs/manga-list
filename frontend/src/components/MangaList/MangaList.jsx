import React, { useEffect, useState } from "react";
import axios from "axios";

//import FormularioManga from "../FormularioManga/FormularioManga";

function MangaList(props) {
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
  }, [props.refresher]);

  const RemoverManga = async (id) => {
    try {
      await axios.delete("http://localhost:8800/mangas/" + id);
      props.setRefresher((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const UpdatingManga = (id) => {
    props.setUpdater(id);
  };

  return (
    <div>
      <ul>
        {mangas.map((manga, index) => (
          <li key={index}>
            <h2>{manga.nome}</h2>
            <p>Autor: {manga.autor}</p>
            <p>Data de Publicação: {manga.publicacao}</p>
            <p>Sinopse: {manga.sinopse}</p>
            <button onClick={() => RemoverManga(manga.id)}>Excluir</button>
            <button onClick={() => UpdatingManga(manga.id)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MangaList;
