import { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
import ExerciseCard from "../components/ExerciseCard.jsx";
import { getBodyParts, getExercisesByBodyPart, searchExercises } from "../services/exerciseService.js";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState("");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const parts = await getBodyParts();
        if (alive) setBodyParts(parts);
      } catch (e) {
        if (alive) setBodyParts([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function runSearch() {
    setError("");
    setLoading(true);
    try {
      const data = await searchExercises(query);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to search exercises.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function runBodyPart(part) {
    setError("");
    setLoading(true);
    try {
      const data = await getExercisesByBodyPart(part);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load exercises.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <div className="page-header">
        <h1>Explore Exercises</h1>
        <p className="muted">Search + filter, then add exercises to your plan.</p>
      </div>

      <div className="panel">
        <div className="controls">
          <input
            className="input"
            placeholder="Search exercises (ex: squat)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn" onClick={runSearch}>Search</button>

          <select
            className="input"
            value={bodyPart}
            onChange={(e) => {
              const v = e.target.value;
              setBodyPart(v);
              if (v) runBodyPart(v);
            }}
          >
            <option value="">Filter by body part</option>
            {bodyParts.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {error ? <p className="error">{error}</p> : null}
      </div>

      {loading ? (
        <Loading label="Loading exercises..." />
      ) : (
        <div className="grid grid-2">
          {items.slice(0, 12).map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </div>
      )}
    </div>
  );
}