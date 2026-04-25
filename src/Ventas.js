import { useNavigate } from "react-router-dom";

function Ventas() {

  const navigate = useNavigate();

  return (
    <div>
      <h1>Pantalla de Ventas</h1>
      <button onClick={() => navigate("/")}>
        ⬅ Volver al inicio
      </button>
    </div>
  );
}
export default Ventas;