import React, { useEffect, useState } from "react";
import FormularioManga from "./components/FormularioManga/FormularioManga";
//import { Routes, Route, BrowserRouter } from "react-router-dom";

import MangaList from "./components/MangaList/MangaList";

//GIT FEATURES!

function App() {
  const [refresher, setRefresher] = useState(true);
  const [mangaToEdit, setMangaToEdit] = useState(null);

  useEffect(() => {
    if (mangaToEdit) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [mangaToEdit]);

  console.log(mangaToEdit)

  return (
    <div>
      <FormularioManga
        setRefresher={setRefresher}
        mangaToEdit={mangaToEdit}
        setMangaToEdit={setMangaToEdit}
      />
      <MangaList
        refresher={refresher}
        setRefresher={setRefresher}
        setMangaToEdit={setMangaToEdit}
      />
    </div>
  );
}

export default App;
