import { useWorkout } from "../context/WorkoutContext.jsx";

export default function Builder() {
  const {
    plan,
    setPlan,
    removeFromPlan,
    updatePlanItem,
    saveCurrentWorkout,
    savedWorkouts,
    removeSavedWorkout,
  } = useWorkout();

  return (
    <div className="stack">
      <div className="page-header">
        <h1>Workout Builder</h1>
        <p className="muted">Edit sets/reps, then save the workout.</p>
      </div>

      <div className="panel">
        <label className="label">Workout name</label>
        <input
          className="input"
          value={plan.name}
          onChange={(e) => setPlan((prev) => ({ ...prev, name: e.target.value }))}
        />

        <div style={{ marginTop: "1rem" }}>
          <button className="btn" onClick={saveCurrentWorkout}>
            Save Workout
          </button>
        </div>
      </div>

      <div className="panel">
        <h2 className="h2">Current workout</h2>

        {plan.items.length === 0 ? (
          <p className="muted">No exercises yet. Go to Explore and add some.</p>
        ) : (
          <ul className="list">
            {plan.items.map((x) => (
              <li key={x.id} className="list-item">
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800 }}>{x.name}</div>
                  <div className="muted">{x.bodyPart} • {x.target}</div>

                  <div className="row">
                    <div>
                      <label className="label">Sets</label>
                      <input
                        className="input small"
                        type="number"
                        min="1"
                        value={x.sets}
                        onChange={(e) => updatePlanItem(x.id, { sets: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="label">Reps</label>
                      <input
                        className="input small"
                        type="number"
                        min="1"
                        value={x.reps}
                        onChange={(e) => updatePlanItem(x.id, { reps: Number(e.target.value) })}
                      />
                    </div>
                    <button className="btn danger" onClick={() => removeFromPlan(x.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="panel">
        <h2 className="h2">Saved workouts</h2>

        {savedWorkouts.length === 0 ? (
          <p className="muted">No saved workouts yet.</p>
        ) : (
          <ul className="list">
            {savedWorkouts.map((workout) => (
              <li key={workout.id} className="list-item">
                <div>
                  <div style={{ fontWeight: 800 }}>{workout.name}</div>
                  <div className="muted">{workout.items.length} exercises</div>
                </div>
                <button className="btn danger" onClick={() => removeSavedWorkout(workout.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}