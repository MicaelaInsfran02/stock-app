import Producto from "./Producto";
import {
    Card,
    CardContent,
    Button,
    Typography
} from "@mui/material";

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

console.log(busquedaProducto);
  return (
    <Card
        sx={{
            mt: 3,
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
        }}
    >
      <CardContent>

      {/* EDITAR CATEGORIA */}
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
          <Typography
            variant="h5"
            onClick={() =>
              setCategoriaAbierta(
                categoriaAbierta === cat.id ? null : cat.id
              )
            }
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              mb: 2,
              color: "#b3daf0",
              userSelect: "none"
            }}
          >
            {categoriaAbierta === cat.id ? "▼" : "▶"} {cat.nombre}
          </Typography>
          {categoriaAbierta === cat.id && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "15px",
                flexWrap: "wrap"
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setEditandoId(cat.id);
                  setNuevoNombre(cat.nombre);
                }}
              >
                Editar nombre
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => eliminarCategoria(cat.id)}
              >
                Eliminar categoría
              </Button>

              <Button
                variant="contained"
                onClick={() => setCategoriaActiva(cat.id)}
              >
                Agregar producto
              </Button>
            </div>
          )}
        </>
      )}

      {/* FORMULARIO PRODUCTO */}
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

      {/* PRODUCTOS */}
    {categoriaAbierta === cat.id && (
      <>
        <ul
          style={{ marginTop: "20px" }} >
          {productosFiltrados.map((prod) => (
            <li key={prod.id}>

              {editandoProducto &&
              editandoProducto.productoId === prod.id ? (

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
      </>
    )}
    </CardContent>
  </Card>
  );
}

export default Categoria;