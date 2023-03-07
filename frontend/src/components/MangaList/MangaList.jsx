import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MangaList.css";

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
    <div className="container">
      <h1>Lista de mangás:</h1>
      <ul className="list-group d-flex flex-wrap">
        {mangas.map((manga, index) => (
          <li className="list-group-item" key={index}>
            <h2>{manga.nome}</h2>
            <div>
              <div>
                <p className="">
                  <span className="p font-weight-bold">Autor:</span> <br />
                  {manga.autor}
                </p>

                <p className="">
                  <span className="p font-weight-bold">
                    Data de Publicação:
                  </span>
                  <br />
                  {manga.publicacao}
                </p>

                <p className="alas">
                  <span className="p font-weight-bold">Sinopse: </span> <br />
                  {manga.sinopse}
                </p>
              </div>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => RemoverManga(manga.id)}
            >
              Excluir
            </button>
            <button
              className="btn btn-warning"
              onClick={() => UpdatingManga(manga.id)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MangaList;
