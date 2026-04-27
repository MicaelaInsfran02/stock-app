import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import Ventas from "./Ventas";

function App() {
  //crear estado de categorias 
  //localStorage.getItem trae lo guardado. JSON.parse, convierte texto a objeto. ? Si no hay nada guardado, devuelve un array vacio
  const [categorias, setCategorias] = useState(() => {
    const datosGuardados = localStorage.getItem("categorias");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });
 
  //guardamos las categorias en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);


  return (
   <Routes>
    <Route
      path="/"
      element={<Home categorias={categorias} setCategorias={setCategorias} />}
    />

    <Route
      path="/ventas"
      element={<Ventas categorias={categorias} setCategorias={setCategorias} />}
    />
  </Routes>
  );

}

export default App;
