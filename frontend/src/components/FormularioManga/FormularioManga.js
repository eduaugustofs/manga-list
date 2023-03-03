import React, { useState } from "react";

function FormularioManga(props) {
  const [nome, setNome] = useState("");
  const [autor, setAutor] = useState("");
  const [data, setData] = useState("");
  const [sinopse, setSinopse] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const novoManga = {
      nome: nome,
      autor: autor,
      data: data,
      sinopse: sinopse,
    };
    props.onMangaAdicionado(novoManga);
    setNome("");
    setAutor("");
    setData("");
    setSinopse("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Mangá:
          <input
            type="text"
            name="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </label>
        <br />
        <label>
          Autor:
          <input
            type="text"
            name="autor"
            value={autor}
            onChange={(event) => setAutor(event.target.value)}
          />
        </label>
        <br />
        <label>
          Data de publicação:
          <input
            type="date"
            name="data"
            value={data}
            onChange={(event) => setData(event.target.value)}
          />
        </label>
        <br />
        <label>
          Sinopse:
          <textarea
            name="sinopse"
            value={sinopse}
            onChange={(event) => setSinopse(event.target.value)}
          ></textarea>
        </label>
        <br />
        <input type="submit" value="Enviar" />
      </form>
      S
    </div>
  );
}

export default FormularioManga;
