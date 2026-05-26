function Producto({
  prod,
  cat,
  eliminarProducto,
  obtenerColorStock,
  setEditandoProducto,
  setProductoEditado
}) {

  return (
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
  );
}

export default Producto;