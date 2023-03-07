import React, { useState } from "react";
import axios from "axios";
import "./FormularioManga.css";

function FormularioManga(props) {
  const [manga, setManga] = useState({
    nome: "",
    autor: "",
    publicacao: null,
    sinopse: "",
  });
  //const [error, setError] = useState(null);

  const handleChange = (e) => {
    setManga((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    //if ("needs-validation") {
    //setError("Por favor, preencha os campos.");
    //props.setRefresher((prev) => !prev);

    //} else
    try {
      if (props.updater) {
        await axios.put("http://localhost:8800/mangas/" + props.updater, manga);
        props.setUpdater("");
        props.setRefresher((prev) => !prev);
        cancelCourse();
      } else {
        await axios.post("http://localhost:8800/addmangas", manga);
        props.setRefresher((prev) => !prev);
        cancelCourse();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelCourse = () => {
    document.getElementById("create-course-form").reset();
  };

  return (
    <div className="container">
      <h1>Adicione um mangá</h1>
      <div className="border border-muted rounded">
        <form id="create-course-form" className="form needs-validation" noValidate onSubmit={handleChange}>
          <div className="col-sm-3">
            <label className="form-label w-50">Nome</label>
            <div className="input-group has-validation">
              <input className="form-control " placeholder="Digite aqui o nome do mangá " type="text" name="nome" required onChange={handleChange} />
              <div className="invalid-feedback">Campo necessário. </div>
            </div>
          </div>
          <br />

          <div className="col-sm-3">
            <label className="form-label w-50">Autor: </label>
            <input className="form-control" placeholder="Escreva aqui o nome do autor" type="text" name="autor" required onChange={handleChange} />
          </div>
          <br />

          <div className="col-sm-3">
            <label className="form-label w-50">Data de publicação: </label>
            <input className="form-control" type="date" name="publicacao" required onChange={handleChange} />
          </div>
          <br />

          <div className="col-sm-6">
            <label className="form-label w-100">Sinopse: </label>
            <textarea className="form-control" placeholder="Escreva aqui a sinopse" rows="5" name="sinopse" required onChange={handleChange}></textarea>
          </div>
          <br />

          <button className="btn btn-primary" onClick={handleClick}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioManga;
