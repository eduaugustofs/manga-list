import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import "./FormularioManga.css";

const Input = ({ value, name, label, handleChange, isValid, placeholder, errorMessage }) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const formStyle = clsx(["form-control", touched && isValid && "is-valid", touched && !isValid && "is-invalid"]);

  return (
    <div className="col-sm-3" onBlur={handleBlur}>
      <label className="form-label w-50">{label}:</label>
      <div className="input-group has-validation">
        <input className={formStyle} placeholder={placeholder} type="text" name={name} required value={value} onChange={handleChange} />
        <div className="invalid-feedback">{errorMessage}</div>
      </div>
    </div>
  );
};

const initialState = {
  nome: "",
  autor: "",
  publicacao: null,
  sinopse: "",
};

function FormularioManga(props) {
  const [manga, setManga] = useState(initialState);
  const [isTextAreaTouched, setIsTextAreaTouched] = useState(false);
  const [isDateInputTouched, setIsDateInputTouched] = useState(false);

  const title = !!props.mangaToEdit ? `Editar ${props.mangaToEdit.nome}` : "Adicione um mangá";

  useEffect(() => {
    if (props.mangaToEdit) {
      console.log(props.mangaToEdit, "editing");
      setManga({
        nome: props.mangaToEdit.nome,
        autor: props.mangaToEdit.autor,
        publicacao: props.mangaToEdit.publicacao,
        sinopse: props.mangaToEdit.sinopse,
      });
    }
  }, [props.mangaToEdit]);

  const handleBlur = (key) => {
    switch (key) {
      case "textarea":
        return setIsTextAreaTouched(true);
      case "date-input":
        return setIsDateInputTouched(true);
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    setManga((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    try {
      if (!!props.mangaToEdit) {
        const endpoint = `http://localhost:8800/mangas/${props.mangaToEdit.id}`;
        await axios.put(endpoint, manga);
        props.setRefresher((prev) => !prev);
        cancelCourse();
        props.setMangaToEdit(null);
        return;
      }

      await axios.post("http://localhost:8800/addmangas", manga);
      props.setRefresher((prev) => !prev);
      cancelCourse();
    } catch (err) {
      console.log(err);
    }
  };

  const cancelCourse = () => {
    document.getElementById("create-course-form").reset();
  };

  const isValid = {
    nome: manga.nome.length > 2 && manga.nome.length < 45,
    autor: manga.autor.length > 2 && manga.autor.length < 45,
    publicacao: !!manga.publicacao,
    sinopse: manga.sinopse.length > 9 && manga.sinopse.length < 500,
  };

  const isDisabled = !Object.keys(isValid)
    .map((k) => isValid[k])
    .reduce((p, c) => p && c);

  const dateInputStyle = clsx(["form-control", isDateInputTouched && isValid.publicacao && "is-valid", isDateInputTouched && !isValid.publicacao && "is-invalid"]);

  const textAreaStyle = clsx(["form-control", isTextAreaTouched && isValid.sinopse && "is-valid", isTextAreaTouched && !isValid.sinopse && "is-invalid"]);

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="border border-muted rounded">
        <form id="create-course-form" className="form needs-validation" noValidate onSubmit={handleClick}>
          <Input
            label="Nome"
            name="nome"
            placeholder="Digite aqui o nome do mangá"
            handleChange={handleChange}
            isValid={isValid.nome}
            errorMessage="O nome deve ter entre 3 e 50 caracteres"
            value={manga.nome}
          />
          <br />
          <Input
            label="Autor"
            name="autor"
            placeholder="Escreva aqui o nome do(a) autor(a)"
            handleChange={handleChange}
            isValid={isValid.autor}
            errorMessage="O nome deve ter entre 3 e 50 caracteres"
            value={manga.autor}
          />
          <br />

          <div className="col-sm-3">
            <label className="form-label w-50">Data de publicação: </label>
            <input className={dateInputStyle} type="date" name="publicacao" required value={manga.publicacao} onChange={handleChange} onBlur={() => handleBlur("date-input")} />
            <div className="invalid-feedback">Digite uma data</div>
          </div>
          <br />

          <div className="col-sm-6">
            <label className="form-label w-100">Sinopse: </label>
            <textarea
              className={textAreaStyle}
              value={manga.sinopse}
              placeholder="Escreva aqui a sinopse"
              rows="5"
              name="sinopse"
              required
              onChange={handleChange}
              onBlur={() => handleBlur("textarea")}
            ></textarea>
            <div className="invalid-feedback">A sinopse deve ter entre 10 e 500 caracteres</div>
          </div>
          <br />

          <button className="btn btn-primary" type="submit" disabled={isDisabled}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioManga;
