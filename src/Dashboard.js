function Dashboard({
  categorias,
  totalProductos,
  stockTotal,
  productosStockBajo
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            background: "#3f42f1",
            borderRadius: "10px",
            padding: "6px 12px",
            width: "90px",
            textAlign: "center",
            color: "white"
          }}
        >
          <div style={{ fontSize: "12px" }}>
            CATEGORÍAS
          </div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: "bold"
            }}
          >
            {categorias.length}
          </div>
        </div>

        <div
          style={{
            fontFamily: "Arial, sans-serif",
            background: "#3f42f1",
            borderRadius: "10px",
            padding: "6px 12px",
            width: "90px",
            textAlign: "center",
            color: "white"
          }}
        >
          <div style={{ fontSize: "12px" }}>
            PRODUCTOS
          </div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: "bold"
            }}
          >
            {totalProductos}
          </div>
        </div>

        <div
          style={{
            fontFamily: "Arial, sans-serif",
            background: "#3f42f1",
            borderRadius: "10px",
            padding: "6px 12px",
            width: "90px",
            textAlign: "center",
            color: "white"
          }}
        >
          <div style={{ fontSize: "12px" }}>
            STOCK
          </div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: "bold"
            }}
          >
            {stockTotal}
          </div>
        </div>
      </div>

      {productosStockBajo.length > 0 && (
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f37575",
            border: "1px solid #ff5252",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "20px",
            width: "340px"
          }}
        >
          <strong>⚠ STOCK BAJO</strong>

          <ul
            style={{
              marginTop: "8px",
              marginBottom: 0
            }}
          >
            {productosStockBajo.map((prod) => (
              <li key={prod.id}>
                {prod.nombre} - Stock: {prod.stock}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Dashboard;