import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  //crear estado de categorias 
  //localStorage.getItem trae lo guardado. JSON.parse, convierte texto a objeto. ? Si no hay nada guardado, devuelve un array vacio
  const [categorias, setCategorias] = useState(() => {
    const datosGuardados = localStorage.getItem("categorias");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  const [nombreCategoria, setNombreCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null); //editandoID guara que cat estoy editando
  const [nuevoNombre, setNuevoNombre] = useState(""); //guarda el texto nuevo

  //crear estados para productos
  const [productoNombre, setProductoNombre] = useState("");
  const [productoCosto, setProductoCosto] = useState("");
  const [productoPorcentaje, setProductoPorcentaje] = useState("");
  const [productoStock, setProductoStock] = useState("");
  //estado para saber a que categoria se le esta agregando el producto
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  //estado para editar producto (editandoProducto guarda {categoriaId,productoId})
  const [editandoProducto, setEditandoProducto] = useState(null);
  //estado para guardar los datos editados del producto
  const [productoEditado, setProductoEditado] = useState({
    nombre: "",
    costo: "",
    porcentaje: "",
    stock: ""
  });

    //guardamos las categorias en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);
   
    //-----------------------------FUNCIONES-----------------------------//  

  //creamos la funcion para agregar categoria 
  const agregarCategoria = () => {
    if (nombreCategoria.trim() === "") return;

      const nuevaCategoria = {
        id: Date.now(), // ID automático
        nombre: nombreCategoria,
        productos: [] // Inicialmente sin productos, queda el array vacio
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

 //creamos la funcion para agregar productos a una categoria, con calculo de precio incluido
  const agregarProducto = (categoriaId) => {
    const categoriasActualizadas = categorias.map(cat => { 

      if (cat.id === categoriaId) {

        const precio = productoCosto * (1 + productoPorcentaje / 100);//calculo del precio final sumando el porcentaje al costo
        //creamos el nuevo producto con los datos ingresados y el precio calculado
        const nuevoProducto = {
          id: Date.now(),
          nombre: productoNombre,
          costo: productoCosto,
          porcentaje: productoPorcentaje,
          precio: precio,
          stock: productoStock
        };

        return { //conservamos los datos de la categoria y agregamos el nuevo producto al array de productos
          ...cat,
          productos: [...cat.productos, nuevoProducto]
        };
      }

      return cat;
    });

    setCategorias(categoriasActualizadas);

    // limpiar inputs
    setProductoNombre("");
    setProductoCosto("");
    setProductoPorcentaje("");
    setProductoStock("");
  };
 //creamos la funcion para eliminar un producto de una categoria especifica, filtrando el producto por su ID y devolviendo un nuevo array sin ese producto
  const eliminarProducto = (categoriaId, productoId) => {
    const categoriasActualizadas = categorias.map(cat => {
      if (cat.id === categoriaId) {
        const productosFiltrados = cat.productos.filter( 
          prod => prod.id !== productoId // me quedo con todos menos el que quiero eliminar
        );

        return {
          ...cat,
          productos: productosFiltrados // actualizo el array de productos de esa categoria con el nuevo array filtrado
        };
      }
      return cat;
    });
    setCategorias(categoriasActualizadas);
  };
 
 //creamos funcion para guardar la edicion
  const guardarEdicionProducto = () => {
    const categoriasActualizadas = categorias.map(cat => {

      if (cat.id === editandoProducto.categoriaId) {

        const productosActualizados = cat.productos.map(prod => {

          if (prod.id === editandoProducto.productoId) {

            const nuevoPrecio = productoEditado.costo * (1 + productoEditado.porcentaje / 100);
            return {
              ...prod,
              nombre: productoEditado.nombre,
              costo: productoEditado.costo,
              porcentaje: productoEditado.porcentaje,
              stock: productoEditado.stock,
              precio: nuevoPrecio
            };
          }
          return prod;
        });
        return {
          ...cat,
          productos: productosActualizados
        };
      }
      return cat;
    });

    setCategorias(categoriasActualizadas);
    setEditandoProducto(null);
  };

  //funcion para obtener el color segun el stock del producto
  const obtenerColorStock = (stock) => {
    if (stock <= 2) return "red";
    if (stock <= 5) return "orange";
    return "green";
  };

    //------------------------------RENDERIZADO-----------------------------//
  return (
    <div>
      <button onClick={() => navigate("/ventas")}>
        VENDER
      </button>

      
      <h1>Stocky </h1>

      <input
        placeholder="Nombre de la categoría"
        value={nombreCategoria}
        onChange={(e) => setNombreCategoria(e.target.value)}
      />

      <button onClick={agregarCategoria}>
        Agregar Categoría
      </button>

      <ul>
        {categorias.map((cat) => (
          <li key={cat.id}>

            {/* Editar categoria */}
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
            ) : ( //si no esta editando la categoria se muestra asi
              <>
                <h3>{cat.nombre}</h3>

                <button onClick={() => {
                  setEditandoId(cat.id);
                  setNuevoNombre(cat.nombre);
                }}>
                  Editar nombre
                </button>

                <button onClick={() => eliminarCategoria(cat.id)}>
                  Eliminar categoria
                </button>

                <button onClick={() => setCategoriaActiva(cat.id)}>
                  Agregar producto
                </button>
              </>
            )}

            {/* Formulario para agregar producto */}
            {categoriaActiva === cat.id && (
              <div>
                <input
                  placeholder="Nombre producto"
                  value={productoNombre}
                  onChange={(e) => setProductoNombre(e.target.value)}
                />

                <input
                  placeholder="Costo"
                  type="number"
                  value={productoCosto}
                  onChange={(e) => setProductoCosto(e.target.value)}
                />

                <input
                  placeholder="% ganancia"
                  type="number"
                  value={productoPorcentaje}
                  onChange={(e) => setProductoPorcentaje(e.target.value)}
                />

                <input
                  placeholder="Stock"
                  type="number"
                  value={productoStock}
                  onChange={(e) => setProductoStock(e.target.value)}
                />

                <button onClick={() => agregarProducto(cat.id)}>
                  Guardar producto
                </button>

                <button onClick={() => setCategoriaActiva(null)}>
                  Cancelar
                </button>
              </div>
            )}

            {/* Lista de productos*/}
            <ul>
              {cat.productos.map((prod) => (
                <li key={prod.id}>

                  {editandoProducto &&
                    editandoProducto.productoId === prod.id ? (

                    // MODO EDICIÓN
                    <div>
                      <input
                        value={productoEditado.nombre}
                        onChange={(e) =>
                          setProductoEditado({
                            ...productoEditado,
                            nombre: e.target.value
                          })
                        }
                      />

                      <input
                        type="number"
                        value={productoEditado.costo}
                        onChange={(e) =>
                          setProductoEditado({
                            ...productoEditado,
                            costo: e.target.value
                          })
                        }
                      />

                      <input
                        type="number"
                        value={productoEditado.porcentaje}
                        onChange={(e) =>
                          setProductoEditado({
                            ...productoEditado,
                            porcentaje: e.target.value
                          })
                        }
                      />

                      <input
                        type="number"
                        value={productoEditado.stock}
                        onChange={(e) =>
                          setProductoEditado({
                            ...productoEditado,
                            stock: e.target.value
                          })
                        }
                      />

                      <button onClick={guardarEdicionProducto}>
                        Guardar
                      </button>

                      <button onClick={() => setEditandoProducto(null)}>
                        Cancelar
                      </button>
                    </div>

                  ) : (
                    //si no aprieta editar producto se muestra asi
                    <div style={{ color: obtenerColorStock(prod.stock) }}>
                      {prod.nombre} - ${prod.precio} - Stock: {prod.stock}

                      <button onClick={() => eliminarProducto(cat.id, prod.id)}>
                        Eliminar
                      </button>

                      <button onClick={() => {
                        setEditandoProducto({
                          categoriaId: cat.id,
                          productoId: prod.id
                        });

                        setProductoEditado({
                          nombre: prod.nombre,
                          costo: prod.costo,
                          porcentaje: prod.porcentaje,
                          stock: prod.stock
                        });
                      }}>
                        Editar
                      </button>
                    </div>

                  )}

                </li>
              ))}
            </ul>

          </li>
        ))}
      </ul>
    </div>
  );


}

export default Home;