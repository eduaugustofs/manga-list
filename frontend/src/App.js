import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import FormularioManga from "./components/FormularioManga/FormularioManga";
import MangaList from "./components/MangaList/MangaList";

//GIT FEATURES!

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={[<FormularioManga />, <MangaList />]} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
