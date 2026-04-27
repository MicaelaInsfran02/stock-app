import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Ventas({categorias, setCategorias}) {

  const navigate = useNavigate({categorias, setCategorias});
  //carrito de products seleccionados
  const [carrito, setCarrito]= useState ([]);

  //estado para la busqueda de productos
  const [busqueda, setBusqueda]= useState ("");
  //Obtener todos los productos de cierta categoria
  const todosLosProductos = categorias.flatMap(cat => cat.productos || []);

  //filtar productos 
  const productosFiltrados = todosLosProductos.filter(prod =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  //funcion para cantidades
  const [cantidades, setCantidades] = useState({});

  //funcion para agregar al carrito
  const agregarAlCarrito = (producto) => {
    const cantidad = cantidades[producto.id] || 1;
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );

      setCarrito(nuevoCarrito);

    } else {
      setCarrito([
        ...carrito,
        { ...producto, cantidad }
      ]);
    }
    setBusqueda ("");
  };

  //eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  //funcion para vender
  const vender = () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito");
      return;
    }

    const nuevasCategorias = categorias.map(cat => {
      const nuevosProductos = (cat.productos || []).map(prod => {
        const vendido = carrito.find(item => item.id === prod.id);

        if (vendido) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - vendido.cantidad) //descuenta del stock
          };
        }

        return prod;
      });

      return {
        ...cat,
        productos: nuevosProductos
      };
    });

    setCategorias(nuevasCategorias);

    setCarrito([]);

    alert("Venta realizada correctamente");
  };

 return (
  <div>
    <h1>Ventas</h1>

    <button onClick={() => navigate("/")}>
      ⬅ Volver al inicio
    </button>

    <h2>Carrito</h2>

    {carrito.length === 0 ? (
      <p>No hay productos agregados</p>
    ) : (
      <>
        {/* LISTA DEL CARRITO */}
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              {item.nombre} - Cantidad: {item.cantidad} - Total: $
              {item.precio * item.cantidad}

              <button onClick={() => eliminarDelCarrito(item.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        {/* TOTAL */}
        <h2>
          Total: $
          {carrito.reduce(
            (acc, item) => acc + item.precio * item.cantidad,
            0
          )}
        </h2>

        {/* BOTÓN VENDER */}
        <button onClick={vender}>
          VENDER
        </button>
      </>
    )}

    {/* BUSCADOR */}
    <h2>Buscar producto</h2>

    <input
      placeholder="Buscar..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />

    {/* RESULTADOS */}
    {busqueda.trim() === "" ? (
      <p>Escribí para buscar productos...</p>
    ) : productosFiltrados.length === 0 ? (
      <p>No se encontraron productos</p>
    ) : (
      <ul>
        {productosFiltrados.map((prod) => (
          <li key={prod.id}>
            {prod.nombre} - ${prod.precio}

            <input
              type="number"
              min="1"
              value={cantidades[prod.id] || 1}
              onChange={(e) =>
                setCantidades({
                  ...cantidades,
                  [prod.id]: Number(e.target.value),
                })
              }
              style={{ width: "50px", marginLeft: "10px" }}
            />

            <button onClick={() => agregarAlCarrito(prod)}>
              Agregar
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default Ventas;