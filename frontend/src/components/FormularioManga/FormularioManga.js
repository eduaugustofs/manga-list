import React, { useState } from "react";

function FormularioManga(props) {
  const [nome, setNome] = useState("");
  const [autor, setAutor] = useState("");
  const [publicacao, setPublicacao] = useState("");
  const [sinopse, setSinopse] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const novoManga = {
      nome: nome,
      autor: autor,
      publicacao: publicacao,
      sinopse: sinopse,
    };
    props.onMangaAdicionado(novoManga);

    setNome("");
    setAutor("");
    setPublicacao("");
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
            value={publicacao}
            onChange={(event) => setPublicacao(event.target.value)}
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
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default FormularioManga;
