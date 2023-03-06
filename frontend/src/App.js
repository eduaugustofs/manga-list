import React, { useState } from "react";
import FormularioManga from "./components/FormularioManga/FormularioManga";
//import { Routes, Route, BrowserRouter } from "react-router-dom";

import MangaList from "./components/MangaList/MangaList";

//GIT FEATURES!

function App() {
  const [refresher, setRefresher] = useState(true);
  const [updater, setUpdater] = useState();

  return (
    <div>
      <FormularioManga
        setRefresher={setRefresher}
        updater={updater}
        setUpdater={setUpdater}
      />
      <MangaList
        refresher={refresher}
        setRefresher={setRefresher}
        setUpdater={setUpdater}
      />
    </div>
  );
}

export default App;
