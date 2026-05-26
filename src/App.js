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
 
  //persistencia de categorias en localStorage, cada vez que se actualiza categorias, se guarda en localStorage
  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  //estado para ventas, se guarda en localStorage cada vez que se actualiza
  const [ventas, setVentas] = useState(() => {
    const datos = localStorage.getItem("ventas");
    return datos ? JSON.parse(datos) : [];
  });
  //persistencia de ventas en localStorage
  useEffect(() => {
    localStorage.setItem("ventas", JSON.stringify(ventas));
  }, [ventas]);

  return (
    <Routes>
    
    <Route
      path="/"
      element={
        <Home
          categorias={categorias}
          setCategorias={setCategorias}
        />
      }
    />

    <Route
      path="/ventas"
      element={
        <Ventas
          categorias={categorias}
          setCategorias={setCategorias}
          ventas={ventas}
          setVentas={setVentas}
        />
      }
    />

  </Routes>
  );

}

export default App;
