import "../stylesheets/Dashboard.css";

function Dashboard({
  categorias,
  totalProductos,
  stockTotal,
  productosStockBajo
}) {
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div style={{ fontSize: "12px" }}>
            CATEGORÍAS
          </div>

          <div className="dashboard-value">
            {categorias.length}
          </div>
        </div>

        <div className="dashboard-card">
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

        <div className="dashboard-card">
          <div style={{ fontSize: "12px" }}>
            STOCK
          </div>

          <div className="dashboard-value">
            {stockTotal}
          </div>
        </div>
      </div>

      {productosStockBajo.length > 0 && (
        <div className="stock-bajo">
          <strong>⚠ STOCK BAJO</strong>

          <ul className="stock-bajo-list">
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