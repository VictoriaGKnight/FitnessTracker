export default function WorkoutCard({ title, subtitle, onClick, cta = "Open" }) {
  return (
    <div className="card">
      <h3 className="h3">{title}</h3>
      <p className="muted">{subtitle}</p>
      <button className="btn" onClick={onClick}>{cta}</button>
    </div>
  );
}