export default function StatsCard({ label, value, sub }) {
  return (
    <div className="card">
      <div className="muted" style={{ fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: "1.8rem", fontWeight: 800 }}>{value}</div>
      {sub ? <div className="muted">{sub}</div> : null}
    </div>
  );
}