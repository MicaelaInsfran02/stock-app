import { TextField } from "@mui/material";

function BuscadorProductos({
  busquedaProducto,
  setBusquedaProducto
}) {

  return (
    <TextField
      label="Buscar producto..."
      variant="outlined"
      value={busquedaProducto}
      onChange={(e) =>
        setBusquedaProducto(e.target.value)
      }
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        flex: 1
      }}
    />
  );
}

export default BuscadorProductos;