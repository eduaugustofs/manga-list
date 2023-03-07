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

  const handleChange = (e) => {
    setManga((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (props.updater) {
        await axios.put("http://localhost:8800/mangas/" + props.updater, manga);
        props.setUpdater("");
        //cancelCourse();
        setManga({ nome: "", autor: "", publicacao: null, sinopse: "" });
      } else {
        await axios.post("http://localhost:8800/addmangas", manga);
        setManga({ nome: "", autor: "", publicacao: null, sinopse: "" });
        props.setRefresher((prev) => !prev);
        //cancelCourse();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //const cancelCourse = () => {
  //document.getElementById("create-course-form").reset();
  //};

  return (
    <div className="container">
      <h1>Adicione um mangá</h1>
      <div className="border border-muted rounded">
        <form id="create-course-form" className="form" onSubmit={handleChange}>
          <div>
            <div className="col-sm-6">
              <label className="form-label w-50">
                Nome
                <input
                  className="form-control"
                  placeholder="Digite aqui o nome do mangá "
                  type="text"
                  name="nome"
                  onChange={handleChange}
                />
              </label>
            </div>
            <br />
            <div className="col-sm-6">
              <label className="form-label w-50">
                Autor:
                <input
                  className="form-control"
                  placeholder="Escreva aqui o nome do autor"
                  type="text"
                  name="autor"
                  onChange={handleChange}
                />
              </label>
            </div>
            <br />
            <div className="col-sm-6">
              <label className="form-label w-50">
                Data de publicação:
                <input
                  className="form-control"
                  type="date"
                  name="publicacao"
                  onChange={handleChange}
                />
              </label>
            </div>
            <br />
            <div className="col-sm-6">
              <label className="form-label w-100">
                Sinopse:
                <textarea
                  className="form-control"
                  placeholder="Escreva aqui a sinopse"
                  rows="5"
                  name="sinopse"
                  onChange={handleChange}
                ></textarea>
              </label>
            </div>
            <br />

            <button className="btn btn-primary" onClick={handleClick}>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioManga;
