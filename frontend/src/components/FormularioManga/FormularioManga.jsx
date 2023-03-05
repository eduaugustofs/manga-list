import React, { useEffect, useState } from "react";
import axios from "axios";

function FormularioManga(props) {
  const [manga, setManga] = useState({
    nome: "",
    autor: "",
    publicacao: null,
    sinopse: "",
  });

  const handleChange = (e) => {
    setManga((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const adding = await axios.post("http://localhost:8800/addmangas", manga);

      props.onPass(adding.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleChange}>
        <label>
          Nome do Mangá:
          <input type="text" name="nome" onChange={handleChange} />
        </label>
        <br />
        <label>
          Autor:
          <input type="text" name="autor" onChange={handleChange} />
        </label>
        <br />
        <label>
          Data de publicação:
          <input type="date" name="publicacao" onChange={handleChange} />
        </label>
        <br />
        <label>
          Sinopse:
          <textarea name="sinopse" onChange={handleChange}></textarea>
        </label>
        <br />
        <button onClick={handleClick}>Enviar</button>
      </form>
    </div>
  );
}

export default FormularioManga;
