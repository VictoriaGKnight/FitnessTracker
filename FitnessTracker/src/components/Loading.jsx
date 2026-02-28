export default function Loading({ label = "Loading..." }) {
  return (
    <div className="panel">
      <p className="muted">{label}</p>
    </div>
  );
}