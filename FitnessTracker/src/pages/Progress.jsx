import StatsCard from "../components/StatsCard.jsx";
import { useWorkout } from "../context/WorkoutContext.jsx";

export default function Progress() {
  const { logs, plan } = useWorkout();

  const workouts7 = logs.filter((l) => {
    const d = new Date(l.date);
    const now = new Date();
    const diffDays = (now - d) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length;

  const uniqueDates = Array.from(new Set(logs.map((l) => l.date))).sort().reverse();
  let streak = 0;
  for (let i = 0; i < uniqueDates.length; i++) {
    const expected = new Date();
    expected.setDate(expected.getDate() - i);
    const expStr = expected.toISOString().slice(0, 10);
    if (uniqueDates[i] === expStr) streak++;
    else break;
  }

  return (
    <div className="stack">
      <div className="page-header">
        <h1>Progress</h1>
        <p className="muted">Basic stats for MVP.</p>
      </div>

      <div className="grid grid-3">
        <StatsCard label="Workouts (7 days)" value={workouts7} />
        <StatsCard label="Streak (days)" value={streak} sub="Based on logged dates" />
      </div>

      <div className="panel">
        <h2 className="h2">Next (stretch)</h2>
        <p className="muted">Add charts (workouts/week, reps) later for final submission.</p>
      </div>
    </div>
  );
}