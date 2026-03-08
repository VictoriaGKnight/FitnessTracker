/*
import { useState } from "react";
import { useWorkout } from "../context/WorkoutContext.jsx";

export default function Log() {
  const { plan, logs, addLogEntry, removeLogEntry } = useWorkout();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  function submit(e) {
    e.preventDefault();
    addLogEntry({
      title: plan.name,
      date,
      notes,
      exerciseCount: plan.items.length,
    });
    setNotes("");
  }

  return (
    <div className="stack">
      <div className="page-header">
        <h1>Workout Log</h1>
        <p className="muted">Record sessions and review them later.</p>
      </div>

      <form className="panel stack" onSubmit={submit}>
        <div className="row">
          <div>
            <label className="label">Date</label>
            <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label className="label">Notes</label>
            <input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" />
          </div>
        </div>

        <button className="btn" type="submit">
          Save Log Entry
        </button>
      </form>

      <div className="panel">
        <h2 className="h2">Recent logs</h2>
        {logs.length === 0 ? (
          <p className="muted">No logs yet.</p>
        ) : (
          <ul className="list">
            {logs.map((l) => (
              <li key={l.id} className="list-item">
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800 }}>{l.title}</div>
                  <div className="muted">{l.date} • {l.exerciseCount} exercises</div>
                  {l.notes ? <div className="muted">{l.notes}</div> : null}
                </div>
                <button className="btn danger" onClick={() => removeLogEntry(l.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
*/

import { useState } from "react";
import { useWorkout } from "../context/WorkoutContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Log() {
  const { savedWorkouts, logs, addLogEntry, removeLogEntry, loadWorkoutIntoBuilder } = useWorkout();
  const navigate = useNavigate();

  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");
  const [notes, setNotes] = useState("");

  function submit(e) {
    e.preventDefault();

    const selectedWorkout = savedWorkouts.find((w) => w.id === selectedWorkoutId);
    if (!selectedWorkout) return;

    addLogEntry({
  title: selectedWorkout.name,
  date,
  notes,
  exerciseCount: selectedWorkout.items.length,
  items: selectedWorkout.items,
});

    setNotes("");
    setSelectedWorkoutId("");
  }

  return (
    <div className="stack">
      <div className="page-header">
        <h1>Workout Log</h1>
        <p className="muted">Select a saved workout and log it.</p>
      </div>

      <form className="panel stack" onSubmit={submit}>
        <div className="row">
          <div>
            <label className="label">Date</label>
            <input
              className="input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label className="label">Saved workout</label>
            <select
              className="input"
              value={selectedWorkoutId}
              onChange={(e) => setSelectedWorkoutId(e.target.value)}
            >
              <option value="">Select workout</option>
              {savedWorkouts.map((workout) => (
                <option key={workout.id} value={workout.id}>
                  {workout.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Notes</label>
          <input
            className="input"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes"
          />
        </div>

        <button className="btn" type="submit" disabled={!selectedWorkoutId}>
          Save Log Entry
        </button>
      </form>

      <div className="panel">
        <h2 className="h2">Recent logs</h2>

        {logs.length === 0 ? (
          <p className="muted">No logs yet.</p>
        ) : (
          <ul className="list">
            {logs.map((l) => (
              <li key={l.id} className="list-item">
               <div
                style={{ flex: 1, cursor: "pointer" }}
                onClick={() => {
                  loadWorkoutIntoBuilder(l);
                  navigate("/builder");
                }}
              >
              <div style={{ fontWeight: 800 }}>{l.title}</div>
                <div className="muted">{l.date} • {l.exerciseCount} exercises</div>
                  {l.notes ? <div className="muted">{l.notes}</div> : null}
                </div>
                <button className="btn danger" onClick={() => removeLogEntry(l.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}