import { useState } from "react";

//crear estado de categorias 
function App() {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null); //editandoID guara que cat estoy editando
  const [nuevoNombre, setNuevoNombre] = useState(""); //guarda el texto nuevo

  //creamos la funcion para agregar categoria 
  const agregarCategoria = () => {
    if (nombreCategoria.trim() === "") return;

      const nuevaCategoria = {
        id: Date.now(), // ID automático
        nombre: nombreCategoria
      };
    setCategorias([...categorias, nuevaCategoria]);
    setNombreCategoria("");
 };

//creamos la funcion para eliminar categoria
  const eliminarCategoria = (id) => {
    const nuevasCategorias = categorias.filter(cat => cat.id !== id);
    setCategorias(nuevasCategorias);
  };

//creamos la funcion para editar categoria, conservando el nombre actual en el input
const guardarEdicion = (id) => {
  const categoriasActualizadas = categorias.map(cat => {
    if (cat.id === id) {
      return { ...cat, nombre: nuevoNombre };
    }
    return cat;
  });

  setCategorias(categoriasActualizadas);
  setEditandoId(null);
  setNuevoNombre("");
};


  return (
    <div>
      <h1>Stock Manager</h1>
      
      <input
        placeholder="Nombre de la categoría"
        value={nombreCategoria}
        onChange={(e) => setNombreCategoria(e.target.value)}
       />
      
      <button onClick={agregarCategoria}>
        Agregar Categoría
      </button>
      
      <ul>
     
     </ul>
            {categorias.map((cat) => (
        <li key={cat.id}>

          {editandoId === cat.id ? (
            <>
              <input
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
              <button onClick={() => guardarEdicion(cat.id)}>
                Guardar
              </button>
              <button onClick={() => setEditandoId(null)}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              {cat.nombre}
              <button onClick={() => {
                setEditandoId(cat.id);
                setNuevoNombre(cat.nombre);
              }}>
                Editar
              </button>

              <button onClick={() => eliminarCategoria(cat.id)}>
                Eliminar
              </button>
            </>
          )}

        </li>
      ))}
    </div>
  );
}

export default App;
