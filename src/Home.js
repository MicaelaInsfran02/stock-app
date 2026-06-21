import { useState} from "react";
import { useNavigate } from "react-router-dom";
import Producto from "./Producto";
import Categoria from "./Categoria";
import Dashboard from "./Dashboard";
import BuscadorProductos from "./BuscadorProductos";
import NuevaCategoria from "./NuevaCategoria";
import {
  Button,
  Typography
} from "@mui/material";

function Home({ categorias, setCategorias}) {
  const navigate = useNavigate();

  const [nombreCategoria, setNombreCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null); //editandoID guara que cat estoy editando
  const [nuevoNombre, setNuevoNombre] = useState(""); //guarda el texto nuevo

  //crear estados para productos
  const [productoNombre, setProductoNombre] = useState("");
  const [productoCosto, setProductoCosto] = useState("");
  const [productoPorcentaje, setProductoPorcentaje] = useState("");
  const [productoStock, setProductoStock] = useState("");
  //estado para saber que categoria esta abierta para mostrar sus productos
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  //estado para saber a que categoria se le esta agregando el producto
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  //estado para editar producto (editandoProducto guarda {categoriaId,productoId})
  const [editandoProducto, setEditandoProducto] = useState(null);
  //estado para la busqueda de productos
  const [busquedaProducto, setBusquedaProducto] = useState("");
  //estado para mostrar dashboard de ventas
  const [mostrarDashboard, setMostrarDashboard] = useState(false);
  const [mostrarNuevaCategoria, setMostrarNuevaCategoria] = useState(false);
  //estado para guardar los datos editados del producto
  const [productoEditado, setProductoEditado] = useState({
    nombre: "",
    costo: "",
    porcentaje: "",
    stock: ""
  });
   
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
      const categoria = categorias.find(
        cat => cat.id === id
      );
      const confirmar = window.confirm(
        `¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`
      );
      if (!confirmar) return;
      setCategorias(
        categorias.filter(cat => cat.id !== id)
      );
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

// cantidad total de productos
const totalProductos = categorias.reduce(
  (acc, cat) => acc + cat.productos.length,
  0
);

// stock total
const stockTotal = categorias.reduce(
  (acc, cat) =>
    acc +
    cat.productos.reduce(
      (suma, prod) => suma + Number(prod.stock),
      0
    ),
  0
);

// productos con stock bajo
const productosStockBajo = categorias.flatMap(cat =>
  cat.productos.filter(prod => Number(prod.stock) <= 5)
);

// todos los productos con su categoria (para el buscador principal)
const todosLosProductos = categorias.flatMap(cat =>
  cat.productos.map(prod => ({
    ...prod,
    categoria: cat.nombre
  }))
);

const resultadosBusqueda = todosLosProductos.filter(prod =>
  prod.nombre.toLowerCase().includes(
    busquedaProducto.toLowerCase()
  )
);

    //------------------------------RENDERIZADO-----------------------------//
    //estilo para los botones
    const estiloBoton = {
      borderRadius: "8px",
      textTransform: "none",
      fontWeight: "bold"
    };

    return (
    <div
      style={{
        backgroundColor: "#96bff5",
        minHeight: "100vh",
        padding: "30px",
        color: "black"
      }}
    >
      
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          letterSpacing: "4px",
          color: "#f5f5f5",
          marginBottom: "30px"
        }}
      >
        Control de stock
      </Typography>
      {/* BOTONES */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px"
        }}
      >
        <BuscadorProductos
          busquedaProducto={busquedaProducto}
          setBusquedaProducto={setBusquedaProducto}
        />
        <Button 
          variant="contained"
          onClick={() => navigate("/ventas")}
          sx={estiloBoton}
        >
          💰 VENDER
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setMostrarDashboard(!mostrarDashboard);
            setMostrarNuevaCategoria(false);
          }}
          sx={estiloBoton}
        >
          📊 RESUMEN
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setMostrarNuevaCategoria(!mostrarNuevaCategoria);
            setMostrarDashboard(false);
          }}
          sx={estiloBoton}
        >
          ➕ AGREGAR CATEGORÍA
        </Button>

      </div>

      {mostrarDashboard && (
        <Dashboard
          categorias={categorias}
          totalProductos={totalProductos}
          stockTotal={stockTotal}
          productosStockBajo={productosStockBajo}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "25px"
        }}
      >
      </div>

      {mostrarNuevaCategoria && (
        <NuevaCategoria
          nombreCategoria={nombreCategoria}
          setNombreCategoria={setNombreCategoria}
          agregarCategoria={agregarCategoria}
        />
      )}

    {busquedaProducto.trim() !== "" ? (
      <div style={{ fontFamily: "Arial, sans-serif"}}>
        <h3>Resultados</h3>

        {resultadosBusqueda.length === 0 ? (
          <p
            style={{
              color: "#000000",
              textAlign: "center"
            }}
          >
            No se encontraron productos
          </p>
        ) : (
          resultadosBusqueda.map(prod => (
            <div
              key={prod.id}
              style={{
                backgroundColor: "#1e1e1e",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                color: "white"
              }}
            >
              <strong>{prod.nombre}</strong>

              <div>
                Categoría: {prod.categoria}
              </div>

              <div>
                Precio: ${prod.precio}
              </div>

              <div
                style={{
                  color: obtenerColorStock(prod.stock)
                }}
              >
                Stock: {prod.stock}
              </div>
            </div>
          ))
        )}
      </div>
      ) : (
        categorias.map((cat) => (
          <Categoria
            
            categoriaAbierta={categoriaAbierta}
            setCategoriaAbierta={setCategoriaAbierta}
            key={cat.id}
            cat={cat}

            editandoId={editandoId}
            nuevoNombre={nuevoNombre}
            setNuevoNombre={setNuevoNombre}
            guardarEdicion={guardarEdicion}
            setEditandoId={setEditandoId}

            eliminarCategoria={eliminarCategoria}

            setCategoriaActiva={setCategoriaActiva}
            categoriaActiva={categoriaActiva}

            productoNombre={productoNombre}
            setProductoNombre={setProductoNombre}

            productoCosto={productoCosto}
            setProductoCosto={setProductoCosto}

            productoPorcentaje={productoPorcentaje}
            setProductoPorcentaje={setProductoPorcentaje}

            productoStock={productoStock}
            setProductoStock={setProductoStock}

            agregarProducto={agregarProducto}

            editandoProducto={editandoProducto}
            productoEditado={productoEditado}
            setProductoEditado={setProductoEditado}
            guardarEdicionProducto={guardarEdicionProducto}
            setEditandoProducto={setEditandoProducto}

            eliminarProducto={eliminarProducto}
            obtenerColorStock={obtenerColorStock}

            busquedaProducto={busquedaProducto}
          />
        ))
      )} 
    </div>
  );
}
export default Home;