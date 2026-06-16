function DashboardCard({ titulo, valor }) {
  return (
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
      <div
        style={{
          fontSize: "12px"
        }}
      >
        {titulo}
      </div>

      <div
        style={{
          fontSize: "22px",
          fontWeight: "bold"
        }}
      >
        {valor}
      </div>
    </div>
  );
}

export default DashboardCard;