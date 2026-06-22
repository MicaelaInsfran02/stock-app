import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categoria from "./components/Categoria";
import Dashboard from "./components/Dashboard";
import BuscadorProductos from "./components/BuscadorProductos";
import NuevaCategoria from "./components/NuevaCategoria";

// Importamos componentes contenedores y estilizados de MUI
import { Button, Typography, Box, Card, CardContent, Grid } from "@mui/material";
import "./stylesheets/HomeStyles.css"; // Todo tu diseño personalizado va acá

function Home({ categorias, setCategorias }) {
  const navigate = useNavigate();

  // --- ESTADOS DE CATEGORÍAS ---
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [mostrarNuevaCategoria, setMostrarNuevaCategoria] = useState(false);

  // --- ESTADOS DE PRODUCTOS ---
  const [productoNombre, setProductoNombre] = useState("");
  const [productoCosto, setProductoCosto] = useState("");
  const [productoPorcentaje, setProductoPorcentaje] = useState("");
  const [productoStock, setProductoStock] = useState("");
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [productoEditado, setProductoEditado] = useState({ nombre: "", costo: "", porcentaje: "", stock: "" });

  // --- ESTADOS DE INTERFAZ ---
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [mostrarDashboard, setMostrarDashboard] = useState(false);

  // ----------------------------- LOGICA Y FUNCIONES ----------------------------- //  

  const agregarCategoria = () => {
    if (nombreCategoria.trim() === "") return;
    const nuevaCategoria = { id: Date.now(), nombre: nombreCategoria, productos: [] };
    setCategorias([...categorias, nuevaCategoria]);
    setNombreCategoria("");
    setMostrarNuevaCategoria(false); // Cerramos el panel tras agregar
  };

  const eliminarCategoria = (id) => {
    const categoria = categorias.find(cat => cat.id === id);
    if (!window.confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) return;
    setCategorias(categorias.filter(cat => cat.id !== id));
  };

  const guardarEdicion = (id) => {
    setCategorias(categorias.map(cat => cat.id === id ? { ...cat, nombre: nuevoNombre } : cat));
    setEditandoId(null);
    setNuevoNombre("");
  };

  const agregarProducto = (categoriaId) => {
    const categoriasActualizadas = categorias.map(cat => { 
      if (cat.id === categoriaId) {
        const precio = productoCosto * (1 + productoPorcentaje / 100);
        const nuevoProducto = {
          id: Date.now(),
          nombre: productoNombre,
          costo: productoCosto,
          porcentaje: productoPorcentaje,
          precio: precio,
          stock: productoStock
        };
        return { ...cat, productos: [...cat.productos, nuevoProducto] };
      }
      return cat;
    });
    setCategorias(categoriasActualizadas);
    setProductoNombre(""); setProductoCosto(""); setProductoPorcentaje(""); setProductoStock("");
  };

  const eliminarProducto = (categoriaId, productoId) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    setCategorias(categorias.map(cat => {
      if (cat.id === categoriaId) {
        return { ...cat, productos: cat.productos.filter(prod => prod.id !== productoId) };
      }
      return cat;
    }));
  };
 
  const guardarEdicionProducto = () => {
    setCategorias(categorias.map(cat => {
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
        return { ...cat, productos: productosActualizados };
      }
      return cat;
    }));
    setEditandoProducto(null);
  };

  const obtenerColorStock = (stock) => {
    const s = Number(stock);
    if (s <= 2) return "var(--stock-rojo)";
    if (s <= 5) return "var(--stock-naranja)";
    return "var(--stock-verde)";
  };

  // --- CÁLCULOS DERIVADOS ---
  const totalProductos = categorias.reduce((acc, cat) => acc + cat.productos.length, 0);
  const stockTotal = categorias.reduce((acc, cat) => acc + cat.productos.reduce((suma, prod) => suma + Number(prod.stock), 0), 0);
  const productosStockBajo = categorias.flatMap(cat => cat.productos.filter(prod => Number(prod.stock) <= 5));
  const todosLosProductos = categorias.flatMap(cat => cat.productos.map(prod => ({ ...prod, categoria: cat.nombre })));
  const resultadosBusqueda = todosLosProductos.filter(prod => prod.nombre.toLowerCase().includes(busquedaProducto.toLowerCase()));

  return (
    <Box className="home-container">
      
      <Typography variant="h1" className="home-titulo">
        Control de Stock
      </Typography>

      {/* BARRA DE ACCIONES */}
      <Box className="acciones-bar">
        <BuscadorProductos
          busquedaProducto={busquedaProducto}
          setBusquedaProducto={setBusquedaProducto}
        />
        <Button variant="contained" onClick={() => navigate("/ventas")} className="btn-menu btn-vender">
          💰 VENDER
        </Button>
        <Button variant="contained" onClick={() => { setMostrarDashboard(!mostrarDashboard); setMostrarNuevaCategoria(false); }} className="btn-menu btn-resumen">
          📊 RESUMEN
        </Button>
        <Button variant="contained" onClick={() => { setMostrarNuevaCategoria(!mostrarNuevaCategoria); setMostrarDashboard(false); }} className="btn-menu btn-agregar">
          ➕ CATEGORÍA
        </Button>
      </Box>

      {/* DASHBOARD */}
      {mostrarDashboard && (
        <Dashboard
          categorias={categorias}
          totalProductos={totalProductos}
          stockTotal={stockTotal}
          productosStockBajo={productosStockBajo}
        />
      )}

      {/* FORMULARIO NUEVA CATEGORIA */}
      {mostrarNuevaCategoria && (
        <NuevaCategoria
          nombreCategoria={nombreCategoria}
          setNombreCategoria={setNombreCategoria}
          agregarCategoria={agregarCategoria}
        />
      )}

      {/* VISTA DE RESULTADOS O CATEGORÍAS */}
      {busquedaProducto.trim() !== "" ? (
        <Box className="resultados-seccion">
          <Typography variant="h5" className="resultados-titulo">
            Resultados de Búsqueda
          </Typography>

          {resultadosBusqueda.length === 0 ? (
            <Typography className="no-resultados">
              No se encontraron productos coincidentes
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {resultadosBusqueda.map(prod => (
                <Grid item xs={12} sm={6} md={4} key={prod.id}>
                  <Card className="producto-buscado-card">
                    <CardContent>
                      <Typography variant="h6" className="prod-name">{prod.nombre}</Typography>
                      <Typography variant="body2" className="prod-meta">Categoría: <span>{prod.categoria}</span></Typography>
                      <Typography variant="h6" className="prod-precio">${Number(prod.precio).toFixed(2)}</Typography>
                      <Box className="prod-stock-badge" style={{ backgroundColor: obtenerColorStock(prod.stock) }}>
                        Stock: {prod.stock}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      ) : (
        <Box className="categorias-list">
          {categorias.map((cat) => (
            <Categoria
              key={cat.id}
              cat={cat}
              categoriaAbierta={categoriaAbierta}
              setCategoriaAbierta={setCategoriaAbierta}
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
          ))}
        </Box>
      )} 
    </Box>
  );
}

export default Home;