import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Ventas from "./Ventas";

function App() {
  
  return (
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/ventas" element={<Ventas />} />
    </Routes>
  );

}

export default App;
