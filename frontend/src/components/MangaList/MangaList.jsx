import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MangaList.css";

const Manga = ({ manga, setRefresher, setMangaToEdit }) => {
  const { nome, autor, publicacao, sinopse } = manga;

  const handleMangaDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/mangas/" + id);
      setRefresher((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMangaUpdate = () => {
    setMangaToEdit(manga);
  };

  return (
    <li className="list-group-item">
      <h2>{nome}</h2>
      <div>
        <div>
          <p className="">
            <span className="p font-weight-bold">Autor:</span> <br />
            {autor}
          </p>

          <p className="">
            <span className="p font-weight-bold">Data de Publicação:</span>
            <br />
            {new Date(publicacao).toLocaleDateString("pt-BR")}
          </p>

          <p className="alas">
            <span className="p font-weight-bold">Sinopse: </span> <br />
            {sinopse}
          </p>
        </div>
      </div>
      <button className="btn btn-danger" onClick={() => handleMangaDelete(manga.id)}>
        Excluir
      </button>
      <button className="btn btn-warning" onClick={handleMangaUpdate}>
        Editar
      </button>
    </li>
  );
};

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

  return (
    <div className="container">
      <h1>Lista de mangás:</h1>
      <ul className="list-group d-flex flex-wrap">
        {mangas.map((manga, index) => (
          <Manga manga={manga} setRefresher={props.setRefresher} setMangaToEdit={props.setMangaToEdit} key={index} />
        ))}
      </ul>
    </div>
  );
}

export default MangaList;
