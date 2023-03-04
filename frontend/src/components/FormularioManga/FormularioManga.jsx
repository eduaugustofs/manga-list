import React, { useState } from "react";
import axios from "axios";

function FormularioManga(props) {
  const [manga, setManga] = useState({
    nome: "",
    autor: "",
    date: "",
    sinopse: "",
  });

  const handleChange = (e) => {
    setManga((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(manga);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/addmangas", manga);
      props.onPass(manga);
    } catch (err) {}
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
          <input type="date" name="data" onChange={handleChange} />
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
