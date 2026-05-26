import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Producto from "./Producto";
import Categoria from "./Categoria";
import {
  Button,
  TextField,
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
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: "30px",
        color: "white"
      }}
    >
      <button onClick={() => navigate("/ventas")}>
        VENDER
      </button>

      
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          marginBottom: "30px"
        }}
      >
        MIStock
      </Typography>

      <TextField
        label="Nombre de la categoría"
        variant="outlined"
        value={nombreCategoria}
        onChange={(e) => setNombreCategoria(e.target.value)}
        size="medium"
        sx={{
          width: "300px",
          marginRight: "15px",

          "& .MuiInputLabel-root": {
            color: "#bdbdbd",
            fontSize: "16px"
          },

          "& .MuiOutlinedInput-root": {
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "12px",

            "& fieldset": {
              borderColor: "#444"
            },

            "&:hover fieldset": {
              borderColor: "#666"
            },

            "&.Mui-focused fieldset": {
              borderColor: "#90caf9"
            }
          }
        }}
      />

      <Button
        variant="contained"
        size="large"
        onClick={agregarCategoria}
        sx={{
          height: "56px",
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: "bold"
        }}
      >
        Agregar Categoría
      </Button>

      <ul>
        {categorias.map((cat) => (
          <Categoria
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
          />
        ))}
      </ul>
    </div>
  );
}
export default Home;