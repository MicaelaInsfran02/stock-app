import {
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";

function Producto({
  prod,
  cat,
  eliminarProducto,
  obtenerColorStock,
  setEditandoProducto,
  setProductoEditado
}) {

  return (
    <Card
      sx={{
        mt: 2,
        backgroundColor: "#204263",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(87, 87, 87, 0.3)"
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          📦 {prod.nombre}
        </Typography>

        <Typography>
          💲 Precio: ${prod.precio}
        </Typography>

        <Typography
          sx={{
            color: obtenerColorStock(prod.stock)
          }}
        >
          📊 Stock: {prod.stock}
        </Typography>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px"
          }}
        >
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              eliminarProducto(cat.id, prod.id)
            }
          >
            Eliminar
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => {
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
            }}
          >
            Editar
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}

export default Producto;