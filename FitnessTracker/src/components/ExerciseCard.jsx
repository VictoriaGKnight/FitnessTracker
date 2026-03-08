import { useWorkout } from "../context/WorkoutContext.jsx";

export default function ExerciseCard({ exercise }) {
  const { addToPlan } = useWorkout();

  const name = exercise?.name || "Unknown Exercise";
  const bodyPart = exercise?.bodyPart || "—";
  const equipment = exercise?.equipment || "—";
  const target = exercise?.target || "—";
  const gifUrl = exercise?.gifUrl
  ? exercise.gifUrl.startsWith("http")
    ? exercise.gifUrl
    : `https://exercisedb.p.rapidapi.com${exercise.gifUrl}`
  : null;

  return (
    <div className="card exercise-card">
      <div className="exercise-media">
        {gifUrl ? (
          <img className="exercise-img" src={gifUrl} alt={name} loading="lazy" />
        ) : (
          <div className="exercise-img placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="exercise-body">
        <h3 className="h3">{name}</h3>
        <p className="muted">
          {bodyPart} • {target} • {equipment}
        </p>

        <button className="btn" onClick={() => addToPlan(exercise)}>
          Add to Workout Plan
        </button>
      </div>
    </div>
  );
}