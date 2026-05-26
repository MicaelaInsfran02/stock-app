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
  obtenerColorStock
}) {

  return (
    <Card
        sx={{
            marginTop: "20px",
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "15px"
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
      <ul>
        {cat.productos.map((prod) => (
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

    </CardContent>
  </Card>
  );
}

export default Categoria;