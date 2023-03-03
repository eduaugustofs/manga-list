import React, { useState } from "react";
import FormularioManga from "../FormularioManga/FormularioManga";

function MangaList() {
  const [mangas, setMangas] = useState([]);

  function handleMangaAdicionado(novoManga) {
    setMangas([...mangas, novoManga]);
  }

  const removerManga = (index) => {
    const mangasRestantes = [...mangas];
    mangasRestantes.splice(index, 1);
    setMangas(mangasRestantes);
  };

  return (
    <div>
      <FormularioManga onMangaAdicionado={handleMangaAdicionado} />;
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
