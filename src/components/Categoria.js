import Producto from "./Producto";
import "../stylesheets/Categoria.css";
import {
    Card,
    CardContent,
    Button,
    Typography,
    IconButton
} from "@mui/material";
import { useState } from "react";

function Categoria({
  cat,
  editandoId,
  nuevoNombre,
  setNuevoNombre,
  guardarEdicion,
  setEditandoId,
  eliminarCategoria,
  setCategoriaActiva,
  categoriaActiva,
  productoNombre,
  setProductoNombre,
  productoCosto,
  setProductoCosto,
  productoPorcentaje,
  setProductoPorcentaje,
  productoStock,
  setProductoStock,
  agregarProducto,
  editandoProducto,
  productoEditado,
  setProductoEditado,
  guardarEdicionProducto,
  setEditandoProducto,
  eliminarProducto,
  obtenerColorStock,
  categoriaAbierta,
  setCategoriaAbierta,
  busquedaProducto
}) {

const productosFiltrados = cat.productos.filter((prod) =>
  prod.nombre.toLowerCase().includes(
    busquedaProducto.toLowerCase()
  )
);


const [mostrarOpciones, setMostrarOpciones] = useState(null);

console.log(busquedaProducto);
  return (
  <Card
    sx={{
      mt: 3,
      backgroundColor: "#7296b8",
      color: "white",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(79, 116, 196, 0.3)" 
    }}
  >
    <CardContent>

      {/* EDITAR CATEGORIA */}
      {editandoId === cat.id ? (
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => guardarEdicion(cat.id)}
          >
            Guardar
          </Button>
          <Button
            variant="outlined"
            onClick={() => setEditandoId(null)}
          >
            Cancelar
          </Button>
        </div>
      ) : (
        <>
          {/* HEADER CATEGORIA */}
            <div className="categoria-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              
              {/* Bloque Izquierdo: Título + Opciones pegadas al nombre */}
              <div style={{ display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                <Typography
                  variant="h5"
                  onClick={() =>
                    setCategoriaAbierta(categoriaAbierta === cat.id ? null : cat.id)
                  }
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#03265f",
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                {categoriaAbierta === cat.id ? "▼" : "▶"} {cat.nombre}
              </Typography>

              {/* RUEDITA */}
              <IconButton
                onClick={() =>
                  setMostrarOpciones(
                    mostrarOpciones === cat.id ? null : cat.id
                  )
                }
                sx={{ color: "white" }}
              >
                ⚙
              </IconButton>
            </div>
          </div>

          {/* MENU OPCIONES */}
          {mostrarOpciones === cat.id && (
            <div
              style={{
                marginTop: 10,
                display: "flex",
                gap: 10,
                padding: "10px 12px",
                backgroundColor: "#f3efef",
                borderRadius: 12,
                boxShadow: "0 4px 10px #5f5f5f", //sombra 
                width: "fit-content"
              }}
            >
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  setEditandoId(cat.id);
                  setNuevoNombre(cat.nombre);
                  setMostrarOpciones(null);
                }}
              >
                Editar
              </Button>

              <Button
                size="small"
                color="error"
                variant="outlined"
                onClick={() => {
                  eliminarCategoria(cat.id);
                  setMostrarOpciones(null);
                }}
              >
                Eliminar
              </Button>

              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  setCategoriaActiva(cat.id);
                  setMostrarOpciones(null);
                }}
              >
                + Producto
              </Button>
            </div>
          )}

          {/* FORMULARIO PRODUCTO */}
          {categoriaActiva === cat.id && (
            <div style={{ marginTop: 15, display: "flex", gap: 10, flexWrap: "wrap" }}>
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

              <Button
                variant="contained"
                onClick={() => agregarProducto(cat.id)}
              >
                Guardar producto
              </Button>

              <Button
                variant="outlined"
                onClick={() => setCategoriaActiva(null)}
              >
                Cancelar
              </Button>
            </div>
          )}

          {/* PRODUCTOS */}
          {categoriaAbierta === cat.id && (
            <ul style={{ marginTop: "20px" }}>
              {productosFiltrados.map((prod) => (
                <li key={prod.id}>
                  {editandoProducto &&
                  editandoProducto.productoId === prod.id ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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

                      <Button onClick={guardarEdicionProducto}>
                        Guardar
                      </Button>

                      <Button onClick={() => setEditandoProducto(null)}>
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <Producto
                      prod={prod}
                      cat={cat}
                      eliminarProducto={eliminarProducto}
                      obtenerColorStock={obtenerColorStock}
                      setEditandoProducto={setEditandoProducto}
                      setProductoEditado={setProductoEditado}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

    </CardContent>
  </Card>
);
}

export default Categoria;