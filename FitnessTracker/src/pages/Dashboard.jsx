import { useNavigate } from "react-router-dom";
import StatsCard from "../components/StatsCard.jsx";
import WorkoutCard from "../components/WorkoutCard.jsx";
import { useWorkout } from "../context/WorkoutContext.jsx";

export default function Dashboard() {
  const nav = useNavigate();
  const { plan, logs } = useWorkout();

  const workoutsThisWeek = logs.filter((l) => {
    const d = new Date(l.date);
    const now = new Date();
    const diffDays = (now - d) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length;

  return (
    <div className="stack">
      <div className="page-header">
        <h1>Welcome back</h1>
        <p className="muted">Quick stats + jump into your next workout.</p>
      </div>

      <div className="grid grid-3">
        <StatsCard label="Plan Exercises" value={plan.items.length} sub={plan.name} />
        <StatsCard label="Workouts (7 days)" value={workoutsThisWeek} sub="From your log" />
        <StatsCard label="Total Logged" value={logs.length} sub="All time" />
      </div>

      <div className="grid grid-3">
        <WorkoutCard
          title="Start Workout"
          subtitle="Browse exercises and add them to your plan."
          onClick={() => nav("/explore")}
          cta="Explore"
        />
        <WorkoutCard
          title="Build Plan"
          subtitle="Edit sets/reps and save your workout plan."
          onClick={() => nav("/builder")}
          cta="Open Builder"
        />
        <WorkoutCard
          title="Log Workout"
          subtitle="Record a workout session."
          onClick={() => nav("/log")}
          cta="Log"
        />
      </div>

      <div className="panel">
        <h2 className="h2">Recently logged</h2>
        {logs.slice(0, 3).length === 0 ? (
          <p className="muted">No workouts logged yet.</p>
        ) : (
          <ul className="list">
            {logs.slice(0, 3).map((l) => (
              <li key={l.id} className="list-item">
                <div>
                  <div style={{ fontWeight: 700 }}>{l.title}</div>
                  <div className="muted">{l.date} • {l.notes || "No notes"}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}