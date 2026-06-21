import { TextField, Button } from "@mui/material";

function NuevaCategoria({
  nombreCategoria,
  setNombreCategoria,
  agregarCategoria
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "20px"
      }}
    >
      <TextField
        label="Nombre de la categoría"
        variant="outlined"
        value={nombreCategoria}
        onChange={(e) =>
          setNombreCategoria(e.target.value)
        }
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "300px"
        }}
      />

      <Button
        variant="contained"
        onClick={agregarCategoria}
      >
        Guardar
      </Button>
    </div>
  );
}

export default NuevaCategoria;